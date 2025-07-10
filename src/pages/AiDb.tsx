import React from 'react';

interface AiDbProps {
  containerSize?: string;
}

export const AiDb: React.FC<AiDbProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  
  return (
    <div className={`${isCompact ? 'p-3' : 'p-6'}`}>
      <h1 className={`font-bold text-white mb-4 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
        AI Database
      </h1>
      <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
        AI-powered database queries and management
      </p>
    </div>
  );
};
