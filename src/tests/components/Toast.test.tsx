import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Toast } from '../../components/Toast';

describe('Toast', () => {
  const defaultProps = {
    message: 'Test message',
    isVisible: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when visible', () => {
    render(<Toast {...defaultProps} />);
    
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByTestId('toast-message')).toHaveTextContent('Test message');
  });

  it('does not render when not visible', () => {
    render(<Toast {...defaultProps} isVisible={false} />);
    
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
  });

  it('displays message correctly', () => {
    render(<Toast {...defaultProps} message="Custom message" />);
    
    expect(screen.getByTestId('toast-message')).toHaveTextContent('Custom message');
  });

  it('displays URL when provided', () => {
    render(<Toast {...defaultProps} url="https://example.com" />);
    
    expect(screen.getByTestId('toast-url')).toHaveTextContent('https://example.com');
  });

  it('does not display URL when not provided', () => {
    render(<Toast {...defaultProps} />);
    
    expect(screen.queryByTestId('toast-url')).not.toBeInTheDocument();
  });

  it('calls onClose when clicked', () => {
    const onClose = vi.fn();
    render(<Toast {...defaultProps} onClose={onClose} />);
    
    const toast = screen.getByTestId('toast');
    fireEvent.click(toast);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    render(<Toast {...defaultProps} />);
    
    const toast = screen.getByTestId('toast');
    expect(toast).toBeInTheDocument();
  });

  it('renders with both message and URL', () => {
    render(
      <Toast 
        {...defaultProps} 
        message="Copied to clipboard!"
        url="https://github.com/example/repo"
      />
    );
    
    expect(screen.getByTestId('toast-message')).toHaveTextContent('Copied to clipboard!');
    expect(screen.getByTestId('toast-url')).toHaveTextContent('https://github.com/example/repo');
  });

  it('handles long URLs correctly', () => {
    const longUrl = 'https://github.com/very/long/repository/url/that/might/wrap/to/multiple/lines';
    render(<Toast {...defaultProps} url={longUrl} />);
    
    expect(screen.getByTestId('toast-url')).toHaveTextContent(longUrl);
  });

  it('renders check icon', () => {
    render(<Toast {...defaultProps} />);
    
    const icon = screen.getByTestId('toast-check-icon');
    expect(icon).toBeInTheDocument();
  });
}); 