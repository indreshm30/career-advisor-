import logging
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.database import JobRole, UserProfile, CareerRecommendation
from app.services.ai_service import EmbeddingService, VectorDatabaseService
from app.schemas.career import SkillAnalysisRequest, CareerMatchResponse, SkillAnalysisResponse

logger = logging.getLogger(__name__)

class CareerAdvisorService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.vector_db = VectorDatabaseService()
    
    async def analyze_skills_and_recommend_careers(
        self, 
        request: SkillAnalysisRequest,
        db: Session,
        limit: int = 10
    ) -> SkillAnalysisResponse:
        """Main function to analyze user skills and recommend careers."""
        
        # Create user profile text for embedding
        user_text = self._create_user_profile_text(request)
        
        # Get embedding for user profile
        user_embedding = await self.embedding_service.get_embedding(user_text)
        
        # Search for similar jobs in vector database
        filters = self._build_search_filters(request)
        similar_jobs = await self.vector_db.search_similar_jobs(
            user_embedding, 
            top_k=limit,
            filters=filters
        )
        
        # Get job details from database
        matches = []
        for job_match in similar_jobs:
            job_id = int(job_match['job_id'])
            job_role = db.query(JobRole).filter(JobRole.id == job_id).first()
            
            if job_role:
                # Analyze skill gaps
                skill_gaps = self._analyze_skill_gaps(request.skills, job_role.required_skills)
                
                # Get learning recommendations
                learning_recs = await self._get_learning_recommendations(skill_gaps, job_role)
                
                # Get career progression path
                career_progression = self._get_career_progression(job_role)
                
                match_response = CareerMatchResponse(
                    job_role=job_role,
                    similarity_score=job_match['similarity_score'],
                    skill_gaps=skill_gaps,
                    recommended_learning=learning_recs,
                    career_progression=career_progression
                )
                matches.append(match_response)
        
        # Generate analysis summary
        analysis_summary = self._generate_analysis_summary(matches, request)
        
        return SkillAnalysisResponse(
            matches=matches,
            total_matches=len(matches),
            analysis_summary=analysis_summary
        )
    
    def _create_user_profile_text(self, request: SkillAnalysisRequest) -> str:
        """Create a text representation of user profile for embedding."""
        text_parts = [
            f"Skills: {', '.join(request.skills)}",
            f"Experience level: {request.experience_level}"
        ]
        
        if request.interests:
            text_parts.append(f"Interests: {', '.join(request.interests)}")
        
        if request.preferred_industries:
            text_parts.append(f"Preferred industries: {', '.join(request.preferred_industries)}")
        
        return ". ".join(text_parts)
    
    def _build_search_filters(self, request: SkillAnalysisRequest) -> Dict[str, Any]:
        """Build filters for vector database search."""
        filters = {}
        
        # Filter by experience level (allow same or one level up)
        experience_levels = {
            "entry": ["entry", "mid"],
            "mid": ["entry", "mid", "senior"],
            "senior": ["mid", "senior"]
        }
        filters["experience_level"] = {"$in": experience_levels.get(request.experience_level, ["entry"])}
        
        # Filter by industry if specified
        if request.preferred_industries:
            filters["industry"] = {"$in": request.preferred_industries}
        
        return filters
    
    def _analyze_skill_gaps(self, user_skills: List[str], required_skills: List[str]) -> List[str]:
        """Identify skills that user lacks for a job."""
        user_skills_lower = [skill.lower().strip() for skill in user_skills]
        required_skills_lower = [skill.lower().strip() for skill in required_skills]
        
        skill_gaps = []
        for required_skill in required_skills_lower:
            # Simple matching - can be enhanced with semantic similarity
            if not any(required_skill in user_skill or user_skill in required_skill 
                      for user_skill in user_skills_lower):
                # Find the original case skill name
                original_skill = next((s for s in required_skills if s.lower().strip() == required_skill), required_skill)
                skill_gaps.append(original_skill)
        
        return skill_gaps
    
    async def _get_learning_recommendations(self, skill_gaps: List[str], job_role: JobRole) -> List[Dict[str, Any]]:
        """Get learning recommendations for skill gaps."""
        recommendations = []
        
        # This is a simplified version - in production, you'd use a more sophisticated
        # system to recommend actual courses, certifications, etc.
        for skill in skill_gaps:
            rec = {
                "skill": skill,
                "resources": [
                    {
                        "title": f"Learn {skill} - Online Course",
                        "type": "course",
                        "provider": "Various Platforms",
                        "duration": "4-8 weeks",
                        "difficulty": "beginner"
                    },
                    {
                        "title": f"{skill} Certification",
                        "type": "certification",
                        "provider": "Industry Standard",
                        "duration": "2-3 months",
                        "difficulty": "intermediate"
                    }
                ]
            }
            recommendations.append(rec)
        
        return recommendations
    
    def _get_career_progression(self, job_role: JobRole) -> List[str]:
        """Get career progression path for a job role."""
        # This is simplified - in production, you'd have a more sophisticated
        # career progression mapping system
        career_path_parts = job_role.career_path.split(" > ")
        
        progression = []
        if job_role.experience_level == "entry":
            progression = [
                f"Junior {job_role.title}",
                f"{job_role.title}",
                f"Senior {job_role.title}",
                f"Lead {job_role.title}",
                f"{career_path_parts[-1]} Manager"
            ]
        elif job_role.experience_level == "mid":
            progression = [
                f"{job_role.title}",
                f"Senior {job_role.title}",
                f"Lead {job_role.title}",
                f"{career_path_parts[-1]} Manager",
                f"{career_path_parts[-1]} Director"
            ]
        else:
            progression = [
                f"Senior {job_role.title}",
                f"Lead {job_role.title}",
                f"{career_path_parts[-1]} Manager",
                f"{career_path_parts[-1]} Director",
                f"{career_path_parts[-1]} VP"
            ]
        
        return progression
    
    def _generate_analysis_summary(self, matches: List[CareerMatchResponse], request: SkillAnalysisRequest) -> str:
        """Generate a summary of the analysis."""
        if not matches:
            return f"Based on your skills ({', '.join(request.skills)}), we couldn't find matching career paths. Consider expanding your skill set or exploring related fields."
        
        top_match = matches[0]
        avg_similarity = sum(match.similarity_score for match in matches) / len(matches)
        
        summary = f"Based on your {request.experience_level}-level skills in {', '.join(request.skills[:3])}, "
        summary += f"we found {len(matches)} matching career paths. "
        summary += f"Your top match is {top_match.job_role.title} with {top_match.similarity_score:.2f} similarity. "
        summary += f"Average match score: {avg_similarity:.2f}. "
        
        if matches[0].skill_gaps:
            summary += f"Focus on developing: {', '.join(matches[0].skill_gaps[:3])} to improve your chances."
        
        return summary
