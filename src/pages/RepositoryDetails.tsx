import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, GitFork, Eye, AlertCircle, Copy, Calendar, GitBranch } from 'lucide-react';
import { fetchRepositories } from '../utils/api';
import type { Repository } from '../types/repository';
import { Toast } from '../components/Toast';
import './RepositoryDetails.css';

export const RepositoryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');

  useEffect(() => {
    const loadRepository = async () => {
      try {
        setLoading(true);
        setError(null);
        const repositories = await fetchRepositories();
        const repo = repositories.find(r => r.id.toString() === id);
        
        if (!repo) {
          setError('Repository not found');
        } else {
          setRepository(repo);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repository');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadRepository();
    }
  }, [id]);

  const handleClone = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (loading) {
    return (
      <div className="repository-details">
        <div className="details-header">
          <Link to="/" className="back-button">
            <ArrowLeft size={20} />
            Back to Repositories
          </Link>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading repository details...</p>
        </div>
      </div>
    );
  }

  if (error || !repository) {
    return (
      <div className="repository-details">
        <div className="details-header">
          <Link to="/" className="back-button">
            <ArrowLeft size={20} />
            Back to Repositories
          </Link>
        </div>
        <div className="error-container">
          <div className="error-message">
            <h3>Error loading repository</h3>
            <p>{error || 'Repository not found'}</p>
            <Link to="/" className="retry-button">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="repository-details" data-testid="repository-details">
      <div className="details-header">
        <Link to="/" className="back-button" data-testid="back-button">
          <ArrowLeft size={20} />
          Back to Repositories
        </Link>
      </div>
      
      <div className="details-content">
        <div className="repo-header">
          <div className="repo-actions-top">
            <button 
              className="clone-button"
              onClick={() => handleClone(repository.clone_url)}
              aria-label="Clone repository"
              data-testid="clone-button"
            >
              <Copy size={16} />
              Clone
            </button>
            <a 
              href={repository.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="repo-link"
              data-testid="github-link"
            >
              <ExternalLink size={16} />
              View on GitHub
            </a>
          </div>
          
          <div className="repo-content">
            <div className="repo-breadcrumb" data-testid="repo-breadcrumb">
              <span className="repo-owner">{repository.owner.login}</span>
              <span className="repo-separator">/</span>
              <span className="repo-name">{repository.name}</span>
            </div>
            
            <h1 className="repo-title" data-testid="repo-title">{repository.name}</h1>
            
            <div className="repo-badges">
              <span className={`visibility-badge ${repository.visibility}`} data-testid="visibility-badge">
                {repository.visibility}
              </span>
              {repository.archived && (
                <span className="archived-badge" data-testid="archived-badge">Archived</span>
              )}
            </div>
            
            <div className="repo-actions-mobile">
              <button 
                className="clone-button"
                onClick={() => handleClone(repository.clone_url)}
                aria-label="Clone repository"
                data-testid="clone-button-mobile"
              >
                <Copy size={16} />
                Clone
              </button>
              <a 
                href={repository.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="repo-link"
                data-testid="github-link-mobile"
              >
                <ExternalLink size={16} />
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {repository.description && (
          <div className="description-section" data-testid="description-section">
            <h2 className="section-title">About this repository</h2>
            <div className="description-content">
              <p data-testid="repo-description">{repository.description}</p>
            </div>
          </div>
        )}

        <div className="stats-section" data-testid="stats-section">
          <div className="stats-grid">
            <div className="stat-card" data-testid="forks-stat">
              <div className="stat-icon forks">
                <GitFork size={16} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{repository.forks_count.toLocaleString()}</span>
                <span className="stat-label">Forks</span>
              </div>
            </div>

            <div className="stat-card" data-testid="issues-stat">
              <div className="stat-icon issues">
                <AlertCircle size={16} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{repository.open_issues_count.toLocaleString()}</span>
                <span className="stat-label">Open Issues</span>
              </div>
            </div>

            <div className="stat-card" data-testid="watchers-stat">
              <div className="stat-icon watchers">
                <Eye size={16} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{repository.watchers_count.toLocaleString()}</span>
                <span className="stat-label">Watchers</span>
              </div>
            </div>

            <div className="stat-card" data-testid="stars-stat">
              <div className="stat-icon stars">
                <span className="star-emoji">⭐</span>
              </div>
              <div className="stat-info">
                <span className="stat-value">{repository.stargazers_count.toLocaleString()}</span>
                <span className="stat-label">Stars</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="info-grid">
            {repository.language && (
              <div className="info-card">
                <h3 className="card-title">Primary Language</h3>
                <div className="language-info">
                  <span className="language-dot"></span>
                  <span className="language-name">{repository.language}</span>
                </div>
              </div>
            )}

            <div className="info-card">
              <h3 className="card-title">Repository Details</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{repository.full_name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Default Branch</span>
                  <span className="info-value">
                    <GitBranch size={14} />
                    {repository.default_branch}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Created</span>
                  <span className="info-value">
                    <Calendar size={14} />
                    {new Date(repository.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Updated</span>
                  <span className="info-value">
                    <Calendar size={14} />
                    {new Date(repository.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {repository.license && (
              <div className="info-card">
                <h3 className="card-title">License</h3>
                <div className="license-info">
                  <span className="license-name">{repository.license.name}</span>
                  <a 
                    href={repository.license.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="license-link"
                  >
                    View License
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toast 
        message="Copied to clipboard!"
        url={copiedUrl}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}; 