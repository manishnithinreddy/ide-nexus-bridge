import React, { useState } from 'react';
import { ServiceGrid } from '@/components/CodeBridge/ServiceGrid';
import { AICodeGenerator } from '@/components/CodeBridge/AICodeGenerator';
import { QuickActions } from '@/components/CodeBridge/QuickActions';
import { StatusOverview } from '@/components/CodeBridge/StatusOverview';
import { SimpleTabSwitcher } from '@/components/Tabs/SimpleTabSwitcher';
import { useQuery } from '@tanstack/react-query';
import { codeBridgeApi } from '@/services/codeBridgeApi';
import { CodeBridgeService } from '@/types/codebridge';
import { useToast } from '@/hooks/use-toast';

interface CodeBridgeProps {
  containerSize?: string;
}

export const CodeBridge: React.FC<CodeBridgeProps> = ({ containerSize }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();
  const isCompact = containerSize === 'compact';

  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => codeBridgeApi.getServices(),
  });

  // Show error toast if there's an error
  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Connection Error',
        description: 'Failed to connect to CodeBridge services. Using demo data.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  // Demo data fallback
  const demoServices: CodeBridgeService[] = [
    {
      id: 'gateway',
      name: 'Gateway Service',
      status: 'online',
      description: 'Main entry point for all API requests',
      endpoints: ['/api/gateway', '/api/health', '/api/docs']
    },
    {
      id: 'ai',
      name: 'AI Service',
      status: 'online',
      description: 'AI-powered code generation and analysis',
      endpoints: ['/api/ai/models', '/api/ai/generate', '/api/ai/embed']
    },
    {
      id: 'docker',
      name: 'Docker Service',
      status: 'online',
      description: 'Container management and orchestration',
      endpoints: ['/api/docker/containers', '/api/docker/images']
    },
    {
      id: 'gitlab',
      name: 'GitLab Service',
      status: 'online',
      description: 'Git repository and CI/CD management',
      endpoints: ['/api/gitlab/projects', '/api/gitlab/jobs']
    },
    {
      id: 'security',
      name: 'Security Service',
      status: 'online',
      description: 'Authentication and authorization',
      endpoints: ['/api/auth', '/api/users', '/api/roles']
    },
    {
      id: 'monitoring',
      name: 'Monitoring Service',
      status: 'online',
      description: 'System metrics and performance monitoring',
      endpoints: ['/api/monitoring/metrics', '/api/monitoring/logs']
    }
  ];

  const displayServices = services.length > 0 ? services : demoServices;

  const handleServiceClick = (service: CodeBridgeService) => {
    toast({
      title: `${service.name} Selected`,
      description: `Opening ${service.name} management interface...`,
    });
  };

  const handleActionClick = (action: string) => {
    toast({
      title: 'Quick Action',
      description: `Opening ${action} management...`,
    });
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'ai-generator', label: 'AI Generator' },
    { id: 'services', label: 'Services' },
  ];

  return (
    <div className={`flex flex-col h-full ${isCompact ? 'p-2' : 'p-6'}`}>
      <div className="mb-4">
        <h1 className={`font-bold text-white mb-2 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
          CodeBridge
        </h1>
        <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
          Comprehensive development platform with AI-powered tools
        </p>
      </div>

      <div className="mb-4">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              } ${isCompact ? 'px-2 py-1 text-xs' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'dashboard' && (
          <div className={`grid gap-${isCompact ? '4' : '6'} ${
            isCompact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'
          }`}>
            <div className={isCompact ? 'col-span-1' : 'col-span-2'}>
              <div className={`grid gap-${isCompact ? '4' : '6'} ${
                isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
              }`}>
                <QuickActions 
                  containerSize={containerSize} 
                  onActionClick={handleActionClick}
                />
                <StatusOverview containerSize={containerSize} />
              </div>
            </div>
            
            {!isCompact && (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Docker container started</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">GitLab job completed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">AI code generated</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai-generator' && (
          <AICodeGenerator containerSize={containerSize} />
        )}

        {activeTab === 'services' && (
          <div>
            <div className="mb-4">
              <h2 className={`font-semibold text-white ${isCompact ? 'text-lg' : 'text-xl'}`}>
                Service Management
              </h2>
              <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
                Monitor and manage all CodeBridge services
              </p>
            </div>
            <ServiceGrid 
              services={displayServices}
              onServiceClick={handleServiceClick}
              containerSize={containerSize}
            />
          </div>
        )}
      </div>
    </div>
  );
};
