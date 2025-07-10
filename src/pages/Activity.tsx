import React from 'react';

interface ActivityProps {
  containerSize?: string;
}

export const Activity: React.FC<ActivityProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  
  return (
    <div className={`${isCompact ? 'p-3' : 'p-6'}`}>
      <h1 className={`font-bold text-white mb-4 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
        Activity Feed
      </h1>
      <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
        View recent activity and updates
      </p>
    </div>
  );
};
