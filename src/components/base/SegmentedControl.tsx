import React, { useState } from 'react';

interface SegmentOption {
  value: string;
  label: React.ReactNode;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`bg-element p-1 rounded-lg flex ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`
            flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200
            ${value === option.value 
              ? 'bg-primary text-white shadow-md' 
              : 'text-text-secondary hover:text-text-primary'}
          `}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};