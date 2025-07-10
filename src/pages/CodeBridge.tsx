
import React, { useState } from 'react';
import { CodeGenerator } from '@/components/CodeGeneration/CodeGenerator';
import { CodeBridgeChat } from '@/components/Chat/CodeBridgeChat';
import { SimpleTabSwitcher } from '@/components/Tabs/SimpleTabSwitcher';

interface CodeBridgeProps {
  containerSize?: string;
}

export const CodeBridge: React.FC<CodeBridgeProps> = ({ containerSize }) => {
  const [activeTab, setActiveTab] = useState('generator');
  const [projectId] = useState('demo-project');
  const isCompact = containerSize === 'compact';

  return (
    <div className={`flex flex-col h-full ${isCompact ? 'p-2' : 'p-6'}`}>
      <div className="mb-4">
        <h1 className={`font-bold text-white mb-2 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
          CodeBridge
        </h1>
        <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
          AI-powered code generation and assistance
        </p>
      </div>

      <SimpleTabSwitcher 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        containerSize={containerSize}
      />

      <div className="flex-1 mt-4">
        {activeTab === 'generator' && (
          <CodeGenerator containerSize={containerSize} />
        )}
        {activeTab === 'chat' && (
          <CodeBridgeChat projectId={projectId} containerSize={containerSize} />
        )}
      </div>
    </div>
  );
};
