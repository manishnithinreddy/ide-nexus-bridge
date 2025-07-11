
import React, { useState, useEffect } from 'react';
import { ServiceGrid } from '@/components/CodeBridge/ServiceGrid';
import { AICodeGenerator } from '@/components/CodeBridge/AICodeGenerator';
import { QuickActions } from '@/components/CodeBridge/QuickActions';
import { StatusOverview } from '@/components/CodeBridge/StatusOverview';
import { RecentActivity } from '@/components/CodeBridge/RecentActivity';
import { useQuery } from '@tanstack/react-query';
import { codeBridgeApi } from '@/services/codeBridgeApi';
import { CodeBridgeService } from '@/types/codebridge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodeBridgeProps {
  containerSize?: string;
}

export const CodeBridge: React.FC<CodeBridgeProps> = ({ containerSize }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();
  const isCompact = containerSize === 'compact';
  const isMedium = containerSize === 'medium';

  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => codeBridgeApi.getServices(),
  });

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: 'Connection Error',
        description: 'Failed to connect to CodeBridge services. Using demo data.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  // Comprehensive service data matching your backend
  const allServices: CodeBridgeService[] = [
    {
      id: 'gateway',
      name: 'Gateway Service',
      status: 'online',
      description: 'API routing, security, and load balancing',
      endpoints: ['/api/gateway', '/api/health', '/api/docs', '/api/route']
    },
    {
      id: 'ai',
      name: 'AI Service',
      status: 'online',
      description: 'Text completion, embeddings, and model management',
      endpoints: ['/api/ai/models', '/api/ai/generate', '/api/ai/embed', '/api/ai/auth']
    },
    {
      id: 'docker',
      name: 'Docker Service',
      status: 'online',
      description: 'Container, image, and registry management',
      endpoints: ['/api/docker/containers', '/api/docker/images', '/api/docker/auth', '/api/docker/registry']
    },
    {
      id: 'gitlab',
      name: 'GitLab Service',
      status: 'online',
      description: 'Git integration, CI/CD jobs, and stash management',
      endpoints: ['/api/gitlab/projects', '/api/gitlab/jobs', '/api/gitlab/auth', '/api/gitlab/stash']
    },
    {
      id: 'security',
      name: 'Security Service',
      status: 'online',
      description: 'Authentication, RBAC, and API key management',
      endpoints: ['/api/auth', '/api/users', '/api/roles', '/api/organizations', '/api/api-keys']
    },
    {
      id: 'monitoring',
      name: 'Monitoring Service',
      status: 'online',
      description: 'Metrics, audit logs, and admin dashboard',
      endpoints: ['/api/monitoring/metrics', '/api/monitoring/logs', '/api/monitoring/webhooks', '/api/monitoring/admin']
    },
    {
      id: 'server',
      name: 'Server Service',
      status: 'warning',
      description: 'SSH access, remote operations, and server management',
      endpoints: ['/api/servers', '/api/ssh', '/api/remote', '/api/logs', '/api/proxy']
    },
    {
      id: 'teams',
      name: 'Teams Service',
      status: 'online',
      description: 'Team creation, management, and member operations',
      endpoints: ['/api/teams', '/api/teams/members', '/api/teams/roles']
    },
    {
      id: 'documentation',
      name: 'Documentation Service',
      status: 'online',
      description: 'API docs, code samples, and service information',
      endpoints: ['/api/docs', '/api/docs/search', '/api/docs/samples', '/api/docs/public']
    }
  ];

  const displayServices = services.length > 0 ? services : allServices;

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 ${
        isCompact ? 'px-4 py-3' : 'px-6 py-4'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`font-bold text-foreground ${
                  isCompact ? 'text-xl' : 'text-3xl'
                }`}>
                  CodeBridge Platform
                </h1>
                <p className={`text-muted-foreground ${
                  isCompact ? 'text-xs' : 'text-sm'
                }`}>
                  {isCompact 
                    ? 'DevOps workflow management' 
                    : 'Comprehensive development platform with AI-powered tools'
                  }
                </p>
              </div>
              {isLoading && (
                <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
              )}
            </div>
            
            {/* Navigation Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid w-fit ${
                isCompact ? 'grid-cols-3' : 'grid-cols-4'
              } bg-background border border-border`}>
                <TabsTrigger value="dashboard" className={isCompact ? 'text-xs px-3' : 'px-4'}>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="services" className={isCompact ? 'text-xs px-3' : 'px-4'}>
                  Services
                </TabsTrigger>
                <TabsTrigger value="ai-tools" className={isCompact ? 'text-xs px-3' : 'px-4'}>
                  AI Tools
                </TabsTrigger>
                {!isCompact && (
                  <TabsTrigger value="activity" className="px-4">
                    Activity
                  </TabsTrigger>
                )}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto ${isCompact ? 'p-4' : 'p-6'}`}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="mt-0 space-y-6">
            {/* Stats and Quick Actions Row */}
            <div className={`grid gap-6 ${
              isCompact 
                ? 'grid-cols-1' 
                : isMedium 
                  ? 'grid-cols-1 xl:grid-cols-2' 
                  : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              <QuickActions 
                containerSize={containerSize} 
                onActionClick={handleActionClick}
              />
              <StatusOverview containerSize={containerSize} />
            </div>
            
            {/* Featured Services Grid */}
            <div>
              <h2 className={`font-semibold text-foreground mb-4 ${
                isCompact ? 'text-lg' : 'text-xl'
              }`}>
                Core Services
              </h2>
              <div className={`grid gap-4 ${
                isCompact 
                  ? 'grid-cols-1 sm:grid-cols-2' 
                  : isMedium
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {displayServices.slice(0, isCompact ? 4 : 8).map((service) => (
                  <ServiceGrid 
                    key={service.id}
                    services={[service]}
                    onServiceClick={handleServiceClick}
                    containerSize={containerSize}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity - Only show in non-compact mode */}
            {!isCompact && (
              <RecentActivity containerSize={containerSize} />
            )}
          </TabsContent>

          <TabsContent value="services" className="mt-0">
            <div className="space-y-6">
              <div>
                <h2 className={`font-semibold text-foreground ${
                  isCompact ? 'text-lg' : 'text-xl'
                }`}>
                  All Services
                </h2>
                <p className={`text-muted-foreground ${
                  isCompact ? 'text-xs' : 'text-sm'
                }`}>
                  Monitor and manage all CodeBridge platform services
                </p>
              </div>
              <ServiceGrid 
                services={displayServices}
                onServiceClick={handleServiceClick}
                containerSize={containerSize}
              />
            </div>
          </TabsContent>

          <TabsContent value="ai-tools" className="mt-0">
            <AICodeGenerator containerSize={containerSize} />
          </TabsContent>

          {!isCompact && (
            <TabsContent value="activity" className="mt-0">
              <RecentActivity containerSize={containerSize} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};
