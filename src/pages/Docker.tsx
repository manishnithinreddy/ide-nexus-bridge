import React from 'react';

interface DockerProps {
  containerSize?: string;
}

export const Docker: React.FC<DockerProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  
  return (
    <div className={`${isCompact ? 'p-3' : 'p-6'}`}>
      <h1 className={`font-bold text-white mb-4 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
        Docker Management
      </h1>
      <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
        Manage containers, images, and Docker services
      </p>
      {/* Docker management functionality will be implemented here */}
    </div>
  );
};
