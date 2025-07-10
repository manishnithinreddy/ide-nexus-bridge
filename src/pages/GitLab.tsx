import React from 'react';

interface GitLabProps {
  containerSize?: string;
}

export const GitLab: React.FC<GitLabProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  
  return (
    <div className={`${isCompact ? 'p-3' : 'p-6'}`}>
      <h1 className={`font-bold text-white mb-4 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
        GitLab Integration
      </h1>
      <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
        Manage your Git repositories and CI/CD pipelines
      </p>
      {/* GitLab integration functionality will be implemented here */}
    </div>
  );
};
