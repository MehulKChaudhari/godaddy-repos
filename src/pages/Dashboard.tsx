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
      <div className="dashboard" data-testid="dashboard">
        <div className="dashboard-header">
          <h1 data-testid="dashboard-title">GoDaddy Repositories</h1>
          <p data-testid="loading-message">Loading repositories...</p>
        </div>
        <div className="repositories-grid" data-testid="repositories-grid">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard" data-testid="dashboard">
        <div className="dashboard-header">
          <h1 data-testid="dashboard-title">GoDaddy Repositories</h1>
        </div>
        <div className="error-container" data-testid="error-container">
          <div className="error-message">
            <h3 data-testid="error-title">Error loading repositories</h3>
            <p data-testid="error-message">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
              data-testid="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard" data-testid="dashboard">
      <div className="dashboard-header">
        <h1 data-testid="dashboard-title">GoDaddy Repositories</h1>
        <p data-testid="dashboard-subtitle">Discover {repositories.length} open source projects from GoDaddy</p>
      </div>
      
      <div className="repositories-grid" data-testid="repositories-grid">
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