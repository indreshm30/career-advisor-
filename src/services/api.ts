// API service for connecting React frontend to FastAPI backend

const API_BASE_URL = 'http://localhost:8000/api/v1';

interface SkillAnalysisRequest {
  skills: string[];
  interests?: string[];
  experience_level: 'entry' | 'mid' | 'senior';
  preferred_industries?: string[];
}

interface JobRole {
  id: number;
  title: string;
  description: string;
  required_skills: string[];
  career_path: string;
  experience_level: string;
  industry: string;
  salary_range?: string;
  location?: string;
}

interface CareerMatch {
  job_role: JobRole;
  similarity_score: number;
  skill_gaps: string[];
  recommended_learning: Array<{
    skill: string;
    resources: Array<{
      title: string;
      type: string;
      provider: string;
      duration?: string;
      difficulty: string;
    }>;
  }>;
  career_progression: string[];
}

interface SkillAnalysisResponse {
  matches: CareerMatch[];
  total_matches: number;
  analysis_summary: string;
}

class CareerAdvisorAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async analyzeSkills(request: SkillAnalysisRequest): Promise<SkillAnalysisResponse> {
    const response = await fetch(`${this.baseURL}/career/analyze-skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async getJobs(params: {
    skip?: number;
    limit?: number;
    industry?: string;
    experience_level?: string;
  } = {}): Promise<JobRole[]> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.baseURL}/jobs?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async getJob(jobId: number): Promise<JobRole> {
    const response = await fetch(`${this.baseURL}/jobs/${jobId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async searchSimilarJobs(params: {
    query: string;
    limit?: number;
    industry?: string;
    experience_level?: string;
  }): Promise<Array<{ job: JobRole; similarity_score: number }>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.baseURL}/jobs/search/similar?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

// Create singleton instance
const careerAPI = new CareerAdvisorAPI();

export { careerAPI, type SkillAnalysisRequest, type SkillAnalysisResponse, type JobRole, type CareerMatch };

// Example usage in React component:
/*
import { careerAPI } from './services/api';

const MyComponent = () => {
  const [recommendations, setRecommendations] = useState<SkillAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeUserSkills = async () => {
    setLoading(true);
    try {
      const result = await careerAPI.analyzeSkills({
        skills: ['Python', 'Data Analysis', 'SQL'],
        interests: ['Machine Learning', 'Statistics'],
        experience_level: 'entry',
        preferred_industries: ['Technology']
      });
      
      setRecommendations(result);
    } catch (error) {
      console.error('Error analyzing skills:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={analyzeUserSkills} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze My Skills'}
      </button>
      
      {recommendations && (
        <div>
          <h2>Career Recommendations</h2>
          <p>{recommendations.analysis_summary}</p>
          
          {recommendations.matches.map((match, index) => (
            <div key={index}>
              <h3>{match.job_role.title}</h3>
              <p>Match Score: {(match.similarity_score * 100).toFixed(1)}%</p>
              <p>Industry: {match.job_role.industry}</p>
              <p>Salary: {match.job_role.salary_range}</p>
              
              {match.skill_gaps.length > 0 && (
                <div>
                  <h4>Skills to Develop:</h4>
                  <ul>
                    {match.skill_gaps.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
*/
