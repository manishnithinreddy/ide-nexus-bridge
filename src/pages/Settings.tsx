import React from 'react';

interface SettingsProps {
  containerSize?: string;
}

export const Settings: React.FC<SettingsProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  
  return (
    <div className={`${isCompact ? 'p-3' : 'p-6'}`}>
      <h1 className={`font-bold text-white mb-4 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
        Settings
      </h1>
      <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
        Configure your application preferences
      </p>
    </div>
  );
};
