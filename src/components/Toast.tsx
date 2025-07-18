import { Check } from 'lucide-react';
import './Toast.css';

interface ToastProps {
  message: string;
  url?: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({ message, url, isVisible, onClose }: ToastProps) => {
  if (!isVisible) return null;

  return (
    <div className="toast" onClick={onClose} data-testid="toast">
      <div className="toast-content">
        <div className="toast-icon">
          <Check size={16} data-testid="toast-check-icon" />
        </div>
        <div className="toast-text">
          <div className="toast-title" data-testid="toast-message">{message}</div>
          {url && <div className="toast-url" data-testid="toast-url">{url}</div>}
        </div>
      </div>
    </div>
  );
}; 