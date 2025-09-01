from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr
from datetime import datetime

# User Schemas
class UserProfileBase(BaseModel):
    name: str
    email: EmailStr
    skills: List[str]
    interests: List[str]
    experience_level: str
    education_level: Optional[str] = None
    preferred_locations: Optional[List[str]] = None
    career_goals: Optional[str] = None

class UserProfileCreate(UserProfileBase):
    pass

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    skills: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    experience_level: Optional[str] = None
    education_level: Optional[str] = None
    preferred_locations: Optional[List[str]] = None
    career_goals: Optional[str] = None

class UserProfile(UserProfileBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Job Role Schemas
class JobRoleBase(BaseModel):
    title: str
    description: str
    required_skills: List[str]
    career_path: str
    experience_level: str
    salary_range: Optional[str] = None
    location: Optional[str] = None
    industry: str

class JobRoleCreate(JobRoleBase):
    pass

class JobRole(JobRoleBase):
    id: int
    embedding_id: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Career Recommendation Schemas
class CareerRecommendationBase(BaseModel):
    similarity_score: float
    recommended_skills: Optional[List[str]] = None
    learning_path: Optional[List[Dict[str, Any]]] = None

class CareerRecommendation(CareerRecommendationBase):
    id: int
    user_id: str
    job_role: JobRole
    created_at: datetime
    
    class Config:
        from_attributes = True

# API Request/Response Schemas
class SkillAnalysisRequest(BaseModel):
    skills: List[str]
    interests: Optional[List[str]] = []
    experience_level: str = "entry"
    preferred_industries: Optional[List[str]] = []

class CareerMatchResponse(BaseModel):
    job_role: JobRole
    similarity_score: float
    skill_gaps: List[str]
    recommended_learning: List[Dict[str, Any]]
    career_progression: List[str]

class SkillAnalysisResponse(BaseModel):
    matches: List[CareerMatchResponse]
    total_matches: int
    analysis_summary: str

class LearningResource(BaseModel):
    title: str
    type: str  # course, certification, book, etc.
    provider: str
    url: Optional[str] = None
    duration: Optional[str] = None
    difficulty: str

class SkillGapAnalysis(BaseModel):
    skill: str
    current_level: str
    required_level: str
    learning_resources: List[LearningResource]
