from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.database import JobRole
from app.schemas.career import JobRole as JobRoleSchema, JobRoleCreate
from app.core.database import get_db
from app.services.ai_service import EmbeddingService, VectorDatabaseService

router = APIRouter()

@router.get("/", response_model=List[JobRoleSchema])
async def get_jobs(
    skip: int = 0,
    limit: int = 100,
    industry: Optional[str] = None,
    experience_level: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get list of job roles with optional filtering.
    """
    query = db.query(JobRole)
    
    if industry:
        query = query.filter(JobRole.industry == industry)
    if experience_level:
        query = query.filter(JobRole.experience_level == experience_level)
    
    jobs = query.offset(skip).limit(limit).all()
    return jobs

@router.get("/{job_id}", response_model=JobRoleSchema)
async def get_job(job_id: int, db: Session = Depends(get_db)):
    """
    Get a specific job role by ID.
    """
    job = db.query(JobRole).filter(JobRole.id == job_id).first()
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job role not found"
        )
    return job

@router.post("/", response_model=JobRoleSchema)
async def create_job(
    job: JobRoleCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new job role and generate its embedding.
    """
    try:
        # Create job in database
        db_job = JobRole(**job.dict())
        db.add(db_job)
        db.commit()
        db.refresh(db_job)
        
        # Generate and store embedding
        embedding_service = EmbeddingService()
        vector_db = VectorDatabaseService()
        
        # Create text for embedding
        job_text = f"{job.title}. {job.description}. Required skills: {', '.join(job.required_skills)}. Industry: {job.industry}"
        
        # Get embedding
        embedding = await embedding_service.get_embedding(job_text)
        
        # Store in vector database
        metadata = {
            "title": job.title,
            "industry": job.industry,
            "experience_level": job.experience_level,
            "career_path": job.career_path
        }
        
        await vector_db.upsert_job_embedding(
            job_id=str(db_job.id),
            embedding=embedding,
            metadata=metadata
        )
        
        # Update job with embedding ID
        db_job.embedding_id = str(db_job.id)
        db.commit()
        
        return db_job
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating job: {str(e)}"
        )

@router.get("/search/similar")
async def search_similar_jobs(
    query: str = Query(..., description="Search query for similar jobs"),
    limit: int = Query(10, description="Number of results to return"),
    industry: Optional[str] = Query(None, description="Filter by industry"),
    experience_level: Optional[str] = Query(None, description="Filter by experience level"),
    db: Session = Depends(get_db)
):
    """
    Search for jobs similar to a query using vector similarity.
    """
    try:
        embedding_service = EmbeddingService()
        vector_db = VectorDatabaseService()
        
        # Get embedding for query
        query_embedding = await embedding_service.get_embedding(query)
        
        # Build filters
        filters = {}
        if industry:
            filters["industry"] = industry
        if experience_level:
            filters["experience_level"] = experience_level
        
        # Search similar jobs
        similar_jobs = await vector_db.search_similar_jobs(
            query_embedding=query_embedding,
            top_k=limit,
            filters=filters if filters else None
        )
        
        # Get job details from database
        results = []
        for job_match in similar_jobs:
            job_id = int(job_match['job_id'])
            job = db.query(JobRole).filter(JobRole.id == job_id).first()
            if job:
                results.append({
                    "job": job,
                    "similarity_score": job_match['similarity_score']
                })
        
        return results
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error searching jobs: {str(e)}"
        )
