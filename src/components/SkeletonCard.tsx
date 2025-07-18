import './SkeletonCard.css'

export const SkeletonCard = () => (
  <div className="repository-card skeleton">
    <div className="skeleton-header">
      <div className="skeleton-title"></div>
      <div className="skeleton-badge"></div>
    </div>
    <div className="skeleton-description"></div>
    <div className="skeleton-content">
      <div className="skeleton-stats">
        <div className="skeleton-stat"></div>
        <div className="skeleton-stat"></div>
      </div>
    </div>
    <div className="skeleton-footer">
      <div className="skeleton-updated"></div>
      <div className="skeleton-hint"></div>
    </div>
  </div>
) 