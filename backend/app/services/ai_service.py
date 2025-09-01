import os
import numpy as np
from typing import List, Dict, Any, Optional
from google.cloud import aiplatform
import openai
import pinecone
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class EmbeddingService:
    def __init__(self):
        self.use_google_cloud = bool(settings.GOOGLE_CLOUD_PROJECT)
        self.use_openai_backup = bool(settings.OPENAI_API_KEY)
        
        # Initialize Google Cloud Vertex AI
        if self.use_google_cloud:
            try:
                aiplatform.init(
                    project=settings.GOOGLE_CLOUD_PROJECT,
                    location="us-central1"
                )
                logger.info("Google Cloud Vertex AI initialized")
            except Exception as e:
                logger.warning(f"Failed to initialize Google Cloud: {e}")
                self.use_google_cloud = False
        
        # Initialize OpenAI as backup
        if self.use_openai_backup:
            openai.api_key = settings.OPENAI_API_KEY
            logger.info("OpenAI initialized as backup")
    
    async def get_embedding(self, text: str) -> List[float]:
        """Get embedding for text using Google Cloud or OpenAI as backup."""
        try:
            if self.use_google_cloud:
                return await self._get_google_embedding(text)
            elif self.use_openai_backup:
                return await self._get_openai_embedding(text)
            else:
                raise Exception("No embedding service configured")
        except Exception as e:
            logger.error(f"Error getting embedding: {e}")
            # Fallback to OpenAI if Google Cloud fails
            if self.use_google_cloud and self.use_openai_backup:
                logger.info("Falling back to OpenAI")
                return await self._get_openai_embedding(text)
            raise e
    
    async def _get_google_embedding(self, text: str) -> List[float]:
        """Get embedding from Google Cloud Vertex AI."""
        from vertexai.language_models import TextEmbeddingModel
        
        model = TextEmbeddingModel.from_pretrained("textembedding-gecko@001")
        embeddings = model.get_embeddings([text])
        return embeddings[0].values
    
    async def _get_openai_embedding(self, text: str) -> List[float]:
        """Get embedding from OpenAI."""
        response = await openai.embeddings.create(
            model="text-embedding-ada-002",
            input=text
        )
        return response.data[0].embedding

    async def get_batch_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Get embeddings for multiple texts."""
        embeddings = []
        for text in texts:
            embedding = await self.get_embedding(text)
            embeddings.append(embedding)
        return embeddings

class VectorDatabaseService:
    def __init__(self):
        self.pc = pinecone.Pinecone(api_key=settings.PINECONE_API_KEY)
        self.index_name = settings.PINECONE_INDEX_NAME
        
        # Create index if it doesn't exist
        try:
            self.index = self.pc.Index(self.index_name)
            logger.info(f"Connected to Pinecone index: {self.index_name}")
        except Exception as e:
            logger.warning(f"Index {self.index_name} doesn't exist, creating it...")
            self.pc.create_index(
                name=self.index_name,
                dimension=768,  # Google Cloud Text Embeddings dimension
                metric="cosine"
            )
            self.index = self.pc.Index(self.index_name)
    
    async def upsert_job_embedding(self, job_id: str, embedding: List[float], metadata: Dict[str, Any]):
        """Store job embedding in Pinecone."""
        try:
            self.index.upsert([(job_id, embedding, metadata)])
            logger.info(f"Upserted embedding for job {job_id}")
        except Exception as e:
            logger.error(f"Error upserting job embedding: {e}")
            raise e
    
    async def search_similar_jobs(self, query_embedding: List[float], top_k: int = 10, filters: Optional[Dict] = None) -> List[Dict]:
        """Search for similar job roles."""
        try:
            results = self.index.query(
                vector=query_embedding,
                top_k=top_k,
                include_metadata=True,
                filter=filters
            )
            
            matches = []
            for match in results.matches:
                matches.append({
                    'job_id': match.id,
                    'similarity_score': match.score,
                    'metadata': match.metadata
                })
            
            return matches
        except Exception as e:
            logger.error(f"Error searching similar jobs: {e}")
            raise e
    
    async def delete_job_embedding(self, job_id: str):
        """Delete job embedding from Pinecone."""
        try:
            self.index.delete(ids=[job_id])
            logger.info(f"Deleted embedding for job {job_id}")
        except Exception as e:
            logger.error(f"Error deleting job embedding: {e}")
            raise e
