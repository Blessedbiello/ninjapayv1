import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  gradient = false 
}) => {
  return (
    <div 
      className={`
        bg-card rounded-xl p-4 
        ${gradient ? 'border border-transparent bg-gradient-to-br from-card to-card border-opacity-50 relative' : ''}
        ${className}
      `}
      style={gradient ? {
        backgroundClip: 'padding-box',
        borderImage: 'linear-gradient(to bottom right, rgba(75, 0, 130, 0.3), rgba(100, 65, 165, 0.1)) 1'
      } : {}}
    >
      {children}
    </div>
  );
};