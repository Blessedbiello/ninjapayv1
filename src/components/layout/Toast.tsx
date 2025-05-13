import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle className="text-success" size={20} />,
    error: <AlertCircle className="text-error" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  const bgColors = {
    success: 'bg-success/10 border-success/20',
    error: 'bg-error/10 border-error/20',
    info: 'bg-blue-500/10 border-blue-500/20',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`p-4 rounded-lg border ${bgColors[type]} flex items-start gap-3 max-w-xs`}>
        {icons[type]}
        <p className="text-sm text-text-primary flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-text-secondary hover:bg-element"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};