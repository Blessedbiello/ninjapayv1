import React from 'react';
import { Shield } from 'lucide-react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Shield className="text-primary" size={24} />
      <span className="font-bold text-xl text-text-primary">NinjaPay</span>
    </div>
  );
};