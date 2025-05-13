import React from 'react';

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'primary';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variantClasses = {
    default: 'bg-element text-text-primary',
    success: 'bg-success/20 text-success',
    error: 'bg-error/20 text-error',
    warning: 'bg-yellow-500/20 text-yellow-500',
    info: 'bg-blue-500/20 text-blue-500',
    primary: 'bg-primary/20 text-primary',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};