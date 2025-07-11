
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

  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => codeBridgeApi.getServices(),
  });

  useEffect(() => {
    if (error) {
      toast({
        title: 'Connection Error',
        description: 'Failed to connect to CodeBridge services. Using demo data.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

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
      endpoints: ['/api/docker/containers', '/api/docker/images', '/api/docker/auth']
    },
    {
      id: 'gitlab',
      name: 'GitLab Service',
      status: 'online',
      description: 'Git integration, CI/CD jobs, and stash management',
      endpoints: ['/api/gitlab/projects', '/api/gitlab/jobs', '/api/gitlab/auth']
    },
    {
      id: 'security',
      name: 'Security Service',
      status: 'online',
      description: 'Authentication, RBAC, and API key management',
      endpoints: ['/api/auth', '/api/users', '/api/roles', '/api/organizations']
    },
    {
      id: 'monitoring',
      name: 'Monitoring Service',
      status: 'online',
      description: 'Metrics, audit logs, and admin dashboard',
      endpoints: ['/api/monitoring/metrics', '/api/monitoring/logs', '/api/monitoring/webhooks']
    },
    {
      id: 'server',
      name: 'Server Service',
      status: 'warning',
      description: 'SSH access, remote operations, and server management',
      endpoints: ['/api/servers', '/api/ssh', '/api/remote', '/api/logs']
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
    <div className="h-full bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            CodeBridge Platform
          </h1>
          <p className="text-muted-foreground">
            Comprehensive development platform with AI-powered tools
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-fit grid-cols-4 bg-background border border-border">
              <TabsTrigger value="dashboard">Overview</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActions onActionClick={handleActionClick} />
              <StatusOverview />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Core Services
              </h2>
              <ServiceGrid 
                services={displayServices}
                onServiceClick={handleServiceClick}
              />
            </div>
            <RecentActivity />
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  All Services
                </h2>
                <p className="text-muted-foreground">
                  Monitor and manage all CodeBridge platform services
                </p>
              </div>
              <ServiceGrid 
                services={displayServices}
                onServiceClick={handleServiceClick}
              />
            </div>
          </TabsContent>

          <TabsContent value="ai-tools">
            <AICodeGenerator />
          </TabsContent>

          <TabsContent value="activity">
            <RecentActivity />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
