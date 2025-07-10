import React from 'react';

interface TeamProps {
  containerSize?: string;
}

export const Team: React.FC<TeamProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  
  return (
    <div className={`${isCompact ? 'p-3' : 'p-6'}`}>
      <h1 className={`font-bold text-white mb-4 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
        Team Management
      </h1>
      <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
        Manage team members and collaboration
      </p>
    </div>
  );
};
