# 🚀 Cinematic Career Flow - AI-Powered Career Advisor

An intelligent career advisory platform that leverages AI to provide personalized career recommendations, skill gap analysis, and learning pathways for students and professionals in India.

## 🎯 **Problem Statement**

Students in India often face a bewildering array of career choices, compounded by generic guidance that fails to account for their unique interests, aptitudes, and the rapidly evolving job market. Traditional career counseling struggles to keep pace with new job roles and specific skills required for success.

## 💡 **Solution**

This AI-powered career advisor provides:
- **Personalized Career Matching**: Uses advanced AI embeddings to match user skills with suitable career paths
- **Skills Gap Analysis**: Identifies missing skills for target careers
- **Learning Path Recommendations**: Suggests courses, certifications, and resources
- **Market-Relevant Insights**: Based on current Indian job market trends
- **Interactive UI**: Modern, responsive interface with smooth animations

## 🏗️ **Architecture**

```
Frontend (React + TypeScript) ↔ FastAPI Backend ↔ PostgreSQL + Pinecone Vector DB ↔ Google Cloud AI/OpenAI
```

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Framer Motion** for animations
- **Lucide React** for icons

### **Backend** 
- **FastAPI** (Python) for high-performance API
- **PostgreSQL** for structured data storage
- **Pinecone** vector database for AI similarity search
- **Google Cloud Vertex AI** + OpenAI for embeddings
- **Redis** for caching
- **Docker** for containerization

## 🚀 **Quick Start Guide**

### **Prerequisites**
- Node.js 18+ and npm
- Python 3.11+
- Docker & Docker Compose (recommended)
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/indreshm30/cinematic-career-flow.git
cd cinematic-career-flow
```

### **2. Frontend Setup**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: http://localhost:5173

### **3. Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Copy environment template
cp .env.example .env
```

**Update `.env` file with your API keys:**
```env
# Database
DATABASE_URL=postgresql://career_user:career_password@localhost:5432/career_advisor

# Google Cloud (Primary AI Service)
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json

# OpenAI (Backup AI Service)
OPENAI_API_KEY=your-openai-api-key

# Pinecone Vector Database
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=us-west1-gcp

# Redis
REDIS_URL=redis://localhost:6379
```

**Start the backend services:**

**Option A: Using Docker (Recommended)**
```bash
# Start all services (PostgreSQL, Redis, FastAPI)
docker-compose up --build

# Or run in background
docker-compose up -d
```

**Option B: Manual Setup**
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start PostgreSQL and Redis manually
# Then run the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **4. Load Sample Data**

```bash
# Load sample job roles into the database
python scripts/load_sample_data.py
```

### **5. Access the Application**

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔧 **Development**

### **Frontend Development**
```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### **Backend Development**
```bash
# Run with auto-reload
uvicorn app.main:app --reload

# Run tests
pytest

# Format code
black app/
isort app/
```

### **Project Structure**
```
cinematic-career-flow/
├── src/                          # Frontend React app
│   ├── components/               # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   └── *.tsx                # Feature components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities
│   └── pages/                   # Page components
├── backend/                      # FastAPI backend
│   ├── app/
│   │   ├── api/                 # API routes
│   │   ├── core/                # Configuration
│   │   ├── models/              # Database models
│   │   ├── schemas/             # Pydantic schemas
│   │   └── services/            # Business logic
│   ├── data/                    # Sample data
│   └── scripts/                 # Utility scripts
├── public/                      # Static assets
└── docs/                        # Documentation
```

## 🌟 **Key Features**

### **1. AI-Powered Career Matching**
- Uses vector embeddings to match user profiles with job roles
- Considers skills, interests, experience level, and preferred industries
- Provides similarity scores for each recommendation

### **2. Comprehensive Skills Analysis** 
- Identifies skill gaps for target careers
- Suggests specific learning resources and courses
- Maps career progression pathways

### **3. Indian Job Market Focus**
- 20+ curated job roles relevant to Indian market
- Salary ranges in INR
- Location-based filtering (Bangalore, Mumbai, Delhi, etc.)

### **4. Modern User Experience**
- Responsive design for all devices
- Smooth animations and transitions
- Progressive disclosure of information
- Accessible UI components

## 📊 **API Endpoints**

### **Career Analysis**
- `POST /api/v1/career/analyze-skills` - Get career recommendations
- `POST /api/v1/career/skill-gap-analysis` - Analyze skill gaps
- `GET /api/v1/career/learning-path/{job_id}` - Get learning path

### **Job Management**
- `GET /api/v1/jobs/` - List jobs with filtering
- `GET /api/v1/jobs/{job_id}` - Get job details
- `GET /api/v1/jobs/search/similar` - Semantic job search

## 🔑 **Getting API Keys**

### **Google Cloud Setup**
1. Create a Google Cloud Project
2. Enable Vertex AI API
3. Create a Service Account
4. Download the JSON key file
5. Set `GOOGLE_APPLICATION_CREDENTIALS` in `.env`

### **Pinecone Setup**
1. Sign up at [pinecone.io](https://pinecone.io)
2. Create an index with dimension 768
3. Get your API key and environment
4. Update `.env` with Pinecone credentials

### **OpenAI Setup (Backup)**
1. Get API key from [OpenAI](https://openai.com/api)
2. Add to `.env` as `OPENAI_API_KEY`

## 🚀 **Deployment**

### **Frontend Deployment**
```bash
# Build for production
npm run build

# Deploy to Vercel, Netlify, or any static hosting
# Built files will be in 'dist/' directory
```

### **Backend Deployment**
```bash
# Using Docker
docker build -t career-advisor-backend .
docker run -p 8000:8000 career-advisor-backend

# Or deploy to cloud platforms:
# - Google Cloud Run
# - AWS ECS
# - Railway
# - Render
```

## 🧪 **Testing**

### **Frontend Testing**
```bash
# Run component tests (if configured)
npm test
```

### **Backend Testing**
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/
```

## 📈 **Performance Optimizations**

- **Vector Search**: Pinecone handles millions of job embeddings efficiently
- **Caching**: Redis caches frequent API responses
- **Async Processing**: All AI calls are asynchronous
- **Code Splitting**: React components are lazily loaded
- **Image Optimization**: Optimized assets and lazy loading

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

If you encounter any issues or have questions:

1. Check the [API documentation](http://localhost:8000/docs) when running locally
2. Review the console logs for error messages
3. Ensure all environment variables are set correctly
4. Verify that all services (PostgreSQL, Redis, Backend) are running

## 🔮 **Future Enhancements**

- [ ] Real-time job market data integration
- [ ] Advanced ML model fine-tuning
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Integration with job portals
- [ ] Salary prediction models
- [ ] Company culture matching
- [ ] Peer recommendation system

---

**Built with ❤️ for empowering careers in India**
