import type { Repository } from '../types/repository';
import { formatNumber } from '../utils/api';
import { Star, GitFork, ArrowRight } from 'lucide-react';
import './RepositoryCard.css';

interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const {
    name,
    description,
    stargazers_count,
    forks_count,
    language,
    visibility,
    updated_at
  } = repository;

  const hasDescription = description && description.trim().length > 0;
  const starCount = formatNumber(stargazers_count);
  const forkCount = formatNumber(forks_count);
  const isPublic = visibility === 'public';

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const updated = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  return (
    <div 
      className="repository-card"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name} repository`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
    >
      <div className="card-header">
        <div className="repo-name-section">
          <h3 className="repo-name" aria-label={`Repository: ${name}`}>
            {name}
          </h3>
          <span 
            className={`visibility-badge ${isPublic ? 'public' : 'private'}`}
            aria-label={`Repository is ${visibility}`}
          >
            {visibility}
          </span>
        </div>
        <p 
          className={`repo-description${!hasDescription ? ' placeholder' : ''}`}
          aria-label={hasDescription ? `Description: ${description}` : 'No description available'}
        >
          {hasDescription ? description : 'No description provided.'}
        </p>
      </div>

      <div className="card-content">
        <div className="language-and-stats">
          {language && (
            <div className="language-info">
              <span 
                className="language-dot"
                aria-label={`Primary language: ${language}`}
              ></span>
              <span className="language-name">{language}</span>
            </div>
          )}
          <div className="repo-stats" role="group" aria-label="Repository statistics">
            <div className="stat" aria-label={`${starCount} stars`}>
              <Star size={14} data-icon="star" />
              <span className="stat-value">{starCount}</span>
            </div>
            <div className="stat" aria-label={`${forkCount} forks`}>
              <GitFork size={14} />
              <span className="stat-value">{forkCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="updated-info">
          <span className="updated-text">Updated {getTimeAgo(updated_at)}</span>
        </div>
        <div className="card-click-hint">
          <span>View details</span>
          <ArrowRight size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}; 