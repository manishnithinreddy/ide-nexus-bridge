
import React, { useState } from 'react';
import { ServiceGrid } from '@/components/CodeBridge/ServiceGrid';
import { AICodeGenerator } from '@/components/CodeBridge/AICodeGenerator';
import { QuickActions } from '@/components/CodeBridge/QuickActions';
import { StatusOverview } from '@/components/CodeBridge/StatusOverview';
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
    { id: 'dashboard', label: 'Overview' },
    { id: 'ai-generator', label: 'AI Tools' },
    { id: 'services', label: 'Services' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className={`border-b border-border bg-card ${isCompact ? 'px-4 py-3' : 'px-6 py-4'}`}>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`font-bold text-foreground ${isCompact ? 'text-lg' : 'text-2xl'}`}>
                CodeBridge
              </h1>
              <p className={`text-muted-foreground ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Comprehensive development platform
              </p>
            </div>
            {isLoading && (
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
            )}
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${isCompact ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'} font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${isCompact ? 'p-4' : 'p-6'}`}>
        {activeTab === 'dashboard' && (
          <div className={`space-y-${isCompact ? '4' : '6'}`}>
            {/* Stats Row */}
            <div className={`grid gap-${isCompact ? '4' : '6'} ${
              isCompact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              <QuickActions 
                containerSize={containerSize} 
                onActionClick={handleActionClick}
              />
              <StatusOverview containerSize={containerSize} />
            </div>
            
            {/* Recent Activity - Only show in non-compact mode */}
            {!isCompact && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Docker container started successfully</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-foreground">GitLab pipeline completed</span>
                    <span className="text-xs text-muted-foreground ml-auto">5 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-foreground">AI code generation completed</span>
                    <span className="text-xs text-muted-foreground ml-auto">8 min ago</span>
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
          <div className={`space-y-${isCompact ? '4' : '6'}`}>
            <div>
              <h2 className={`font-semibold text-foreground ${isCompact ? 'text-base' : 'text-xl'}`}>
                Service Management
              </h2>
              <p className={`text-muted-foreground ${isCompact ? 'text-xs' : 'text-sm'}`}>
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
