
import React from 'react';

interface ApiTestingProps {
  containerSize?: string;
}

export const ApiTesting: React.FC<ApiTestingProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  
  return (
    <div className={`${isCompact ? 'p-3' : 'p-6'}`}>
      <h1 className={`font-bold text-white mb-4 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
        API Testing
      </h1>
      <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
        Test your REST and GraphQL APIs
      </p>
      {/* API testing functionality will be implemented here */}
    </div>
  );
};
