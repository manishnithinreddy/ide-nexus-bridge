
import React from 'react';
import { Button } from '@/components/ui/button';

interface SimpleTabSwitcherProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  containerSize?: string;
}

export const SimpleTabSwitcher: React.FC<SimpleTabSwitcherProps> = ({
  activeTab,
  onTabChange,
  containerSize
}) => {
  const isCompact = containerSize === 'compact';

  return (
    <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
      <Button
        variant={activeTab === 'generator' ? 'default' : 'ghost'}
        size={isCompact ? 'sm' : 'default'}
        onClick={() => onTabChange('generator')}
        className={`${
          activeTab === 'generator'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
      >
        Generator
      </Button>
      <Button
        variant={activeTab === 'chat' ? 'default' : 'ghost'}
        size={isCompact ? 'sm' : 'default'}
        onClick={() => onTabChange('chat')}
        className={`${
          activeTab === 'chat'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
      >
        Chat
      </Button>
    </div>
  );
};
