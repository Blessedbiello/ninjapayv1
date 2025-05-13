import React from 'react';
import { Shield } from 'lucide-react';

interface PrivacyScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const PrivacyScoreBadge: React.FC<PrivacyScoreBadgeProps> = ({
  score,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const getColor = (score: number) => {
    if (score < 40) return 'text-error';
    if (score < 70) return 'text-yellow-500';
    return 'text-success';
  };

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {showIcon && <Shield className={getColor(score)} size={iconSizes[size]} />}
      <span className={`font-medium ${sizeClasses[size]} ${getColor(score)}`}>
        {score}
      </span>
    </div>
  );
};