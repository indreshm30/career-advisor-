from sqlalchemy import Column, Integer, String, Text, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class JobRole(Base):
    __tablename__ = "job_roles"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=False)
    required_skills = Column(JSON, nullable=False)  # List of skills
    career_path = Column(String, nullable=False)
    experience_level = Column(String, nullable=False)  # entry, mid, senior
    salary_range = Column(String, nullable=True)
    location = Column(String, nullable=True)
    industry = Column(String, nullable=False)
    embedding_id = Column(String, nullable=True)  # Pinecone vector ID
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    skills = Column(JSON, nullable=False)  # List of user skills
    interests = Column(JSON, nullable=False)  # List of interests
    experience_level = Column(String, nullable=False)
    education_level = Column(String, nullable=True)
    preferred_locations = Column(JSON, nullable=True)
    career_goals = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class CareerRecommendation(Base):
    __tablename__ = "career_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    job_role_id = Column(Integer, nullable=False)
    similarity_score = Column(Float, nullable=False)
    recommended_skills = Column(JSON, nullable=True)  # Skills to develop
    learning_path = Column(JSON, nullable=True)  # Suggested learning resources
    created_at = Column(DateTime(timezone=True), server_default=func.now())
