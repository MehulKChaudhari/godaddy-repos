import { useState, useEffect } from 'react';
import { RepositoryCard } from '../components/RepositoryCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { fetchRepositories } from '../utils/api';
import type { Repository } from '../types/repository';
import './Dashboard.css';

export const Dashboard = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRepositories();
        setRepositories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>GoDaddy Repositories</h1>
          <p>Loading repositories...</p>
        </div>
        <div className="repositories-grid">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>GoDaddy Repositories</h1>
        </div>
        <div className="error-container">
          <div className="error-message">
            <h3>Error loading repositories</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>GoDaddy Repositories</h1>
        <p>Discover {repositories.length} open source projects from GoDaddy</p>
      </div>
      
      <div className="repositories-grid">
        {repositories.map((repository) => (
          <RepositoryCard 
            key={repository.id} 
            repository={repository} 
          />
        ))}
      </div>
    </div>
  );
}; 