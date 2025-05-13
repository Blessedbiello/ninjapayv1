import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  gradient?: boolean;
  height?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = false,
  gradient = false,
  height = 8,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const getColorClass = (percentage: number) => {
    if (percentage < 40) return 'bg-error';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-success';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between mb-1">
        {showLabel && (
          <div className="flex justify-between w-full">
            <span className="text-sm text-text-secondary">{value}</span>
            <span className="text-sm text-text-secondary">{max}</span>
          </div>
        )}
      </div>
      <div 
        className="w-full bg-element rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          className={`
            ${gradient ? 'bg-gradient-to-r from-primary to-secondary' : getColorClass(percentage)}
            transition-all duration-300 ease-in-out
          `}
          style={{ width: `${percentage}%`, height: '100%' }}
        />
      </div>
    </div>
  );
};