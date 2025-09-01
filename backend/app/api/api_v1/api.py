from fastapi import APIRouter
from app.api.api_v1.endpoints import career, jobs

api_router = APIRouter()

api_router.include_router(career.router, prefix="/career", tags=["career"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["jobs"])
