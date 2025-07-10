import React from 'react';

interface ServersProps {
  containerSize?: string;
}

export const Servers: React.FC<ServersProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  
  return (
    <div className={`${isCompact ? 'p-3' : 'p-6'}`}>
      <h1 className={`font-bold text-white mb-4 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
        Server Management
      </h1>
      <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
        Monitor and manage your server infrastructure
      </p>
      {/* Server management functionality will be implemented here */}
    </div>
  );
};
