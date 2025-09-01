import asyncio
import pandas as pd
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine
from app.models.database import Base, JobRole
from app.services.ai_service import EmbeddingService, VectorDatabaseService

async def load_sample_data():
    """Load sample job data into database and vector store."""
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Load CSV data
    df = pd.read_csv('data/sample_jobs.csv')
    
    # Initialize services
    embedding_service = EmbeddingService()
    vector_db = VectorDatabaseService()
    
    db = SessionLocal()
    
    try:
        for _, row in df.iterrows():
            # Parse skills from comma-separated string
            skills = [skill.strip() for skill in row['required_skills'].split(',')]
            
            # Create job record
            job = JobRole(
                title=row['job_title'],
                description=row['description'],
                required_skills=skills,
                career_path=row['career_path'],
                experience_level=row['experience_level'],
                salary_range=row['salary_range'],
                location=row['location'],
                industry=row['industry']
            )
            
            db.add(job)
            db.commit()
            db.refresh(job)
            
            # Create text for embedding
            job_text = f"{job.title}. {job.description}. Required skills: {', '.join(job.required_skills)}. Industry: {job.industry}"
            
            # Get embedding
            print(f"Getting embedding for: {job.title}")
            embedding = await embedding_service.get_embedding(job_text)
            
            # Store in vector database
            metadata = {
                "title": job.title,
                "industry": job.industry,
                "experience_level": job.experience_level,
                "career_path": job.career_path,
                "location": job.location
            }
            
            await vector_db.upsert_job_embedding(
                job_id=str(job.id),
                embedding=embedding,
                metadata=metadata
            )
            
            # Update job with embedding ID
            job.embedding_id = str(job.id)
            db.commit()
            
            print(f"Processed: {job.title}")
            
    except Exception as e:
        print(f"Error loading data: {e}")
        db.rollback()
    finally:
        db.close()
    
    print("Sample data loading completed!")

if __name__ == "__main__":
    asyncio.run(load_sample_data())
