import React, { forwardRef } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    fullWidth = false, 
    className = '', 
    ...props 
  }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              bg-element text-text-primary rounded-lg border 
              ${error ? 'border-error' : 'border-element hover:border-secondary focus:border-primary'} 
              block w-full p-2.5 outline-none transition-colors
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-secondary">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-text-secondary'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';