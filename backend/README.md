# Career Advisor Backend API

A production-ready FastAPI backend for the AI-powered Career and Skills Advisor application.

## Features

- **AI-Powered Career Matching**: Uses Google Cloud Vertex AI or OpenAI for embeddings
- **Vector Similarity Search**: Pinecone vector database for efficient job matching
- **Skills Gap Analysis**: Identifies missing skills for target careers
- **Personalized Learning Paths**: Recommends courses and certifications
- **RESTful API**: Clean, documented API endpoints
- **Production Ready**: Docker, database migrations, error handling

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Vector DB**: Pinecone
- **AI/ML**: Google Cloud Vertex AI + OpenAI (backup)
- **Caching**: Redis
- **Deployment**: Docker & Docker Compose

## Quick Start

### 1. Environment Setup

Copy the environment template and update with your credentials:

```bash
cp .env.example .env
```

Update `.env` with your actual API keys and database credentials.

### 2. Install Dependencies

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Setup

Using Docker (recommended):

```bash
docker-compose up postgres redis -d
```

Or manually install PostgreSQL and Redis.

### 4. Load Sample Data

```bash
python scripts/load_sample_data.py
```

### 5. Run the Application

```bash
# Development mode
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or using Docker Compose
docker-compose up
```

The API will be available at:
- API: http://localhost:8000
- Interactive Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Career Analysis
- `POST /api/v1/career/analyze-skills` - Analyze skills and get career recommendations
- `POST /api/v1/career/skill-gap-analysis` - Analyze skill gaps for target job
- `GET /api/v1/career/learning-path/{job_role_id}` - Get learning path for job

### Job Management
- `GET /api/v1/jobs/` - List all jobs with filtering
- `GET /api/v1/jobs/{job_id}` - Get specific job details
- `POST /api/v1/jobs/` - Create new job (admin)
- `GET /api/v1/jobs/search/similar` - Search similar jobs

## Configuration

### Required Environment Variables

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/career_advisor

# Google Cloud (Primary)
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json

# OpenAI (Backup)
OPENAI_API_KEY=your-openai-api-key

# Pinecone
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=us-west1-gcp

# Redis
REDIS_URL=redis://localhost:6379
```

## Usage Examples

### 1. Analyze Skills for Career Recommendations

```python
import requests

data = {
    "skills": ["Python", "Data Analysis", "SQL"],
    "interests": ["Machine Learning", "Statistics"],
    "experience_level": "entry",
    "preferred_industries": ["Technology"]
}

response = requests.post("http://localhost:8000/api/v1/career/analyze-skills", json=data)
recommendations = response.json()
```

### 2. Search Similar Jobs

```python
import requests

params = {
    "query": "Python developer with machine learning experience",
    "limit": 5,
    "industry": "Technology"
}

response = requests.get("http://localhost:8000/api/v1/jobs/search/similar", params=params)
similar_jobs = response.json()
```

## Development

### Project Structure

```
backend/
├── app/
│   ├── api/           # API routes
│   ├── core/          # Core config and database
│   ├── models/        # Database models
│   ├── schemas/       # Pydantic schemas
│   └── services/      # Business logic
├── data/              # Sample data
├── scripts/           # Utility scripts
└── tests/             # Test files
```

### Running Tests

```bash
pytest
```

### Adding New Job Roles

1. Update `data/sample_jobs.csv` with new job data
2. Run the data loading script:
   ```bash
   python scripts/load_sample_data.py
   ```

## Deployment

### Docker Deployment

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d
```

### Production Considerations

1. **Security**: Update SECRET_KEY, use proper authentication
2. **Scaling**: Use load balancer, multiple FastAPI instances
3. **Monitoring**: Add logging, health checks, metrics
4. **Database**: Use managed PostgreSQL (AWS RDS, etc.)
5. **Vector DB**: Use Pinecone production tier
6. **Caching**: Use managed Redis (AWS ElastiCache, etc.)

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
