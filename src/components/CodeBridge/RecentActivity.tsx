
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  GitBranch, 
  Container, 
  Brain, 
  Server, 
  Shield,
  ExternalLink,
  Clock
} from 'lucide-react';

interface RecentActivityProps {
  containerSize?: string;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';

  const activities = [
    {
      id: 1,
      type: 'docker',
      icon: Container,
      title: 'Container deployment successful',
      description: 'web-app:latest deployed to production',
      timestamp: '2 minutes ago',
      status: 'success',
      user: 'John Doe'
    },
    {
      id: 2,
      type: 'gitlab',
      icon: GitBranch,
      title: 'Pipeline completed',
      description: 'feature/new-dashboard - All tests passed',
      timestamp: '5 minutes ago',
      status: 'success',
      user: 'Jane Smith'
    },
    {
      id: 3,
      type: 'ai',
      icon: Brain,
      title: 'Code generation completed',
      description: 'Generated React component with TypeScript',
      timestamp: '8 minutes ago',
      status: 'success',
      user: 'AI Assistant'
    },
    {
      id: 4,
      type: 'server',
      icon: Server,
      title: 'SSH session established',
      description: 'Connected to prod-server-01',
      timestamp: '12 minutes ago',
      status: 'info',
      user: 'DevOps Team'
    },
    {
      id: 5,
      type: 'security',
      icon: Shield,
      title: 'API key rotated',
      description: 'Production API keys updated successfully',
      timestamp: '15 minutes ago',
      status: 'warning',
      user: 'Security Bot'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500/10 text-green-700 border-green-500/20">Success</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-500/10 text-red-700 border-red-500/20">Error</Badge>;
      default:
        return <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20">Info</Badge>;
    }
  };

  return (
    <Card className="bg-card border-border">
      <div className={`${isCompact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className={`font-semibold text-foreground ${
              isCompact ? 'text-base' : 'text-lg'
            }`}>
              Recent Activity
            </h3>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            <ExternalLink className="h-3 w-3 mr-1" />
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {/* Status Indicator */}
              <div className="flex-shrink-0 mt-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`} />
              </div>

              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="p-2 rounded-md bg-muted">
                  <activity.icon className="h-4 w-4 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`font-medium text-foreground ${
                      isCompact ? 'text-sm' : 'text-base'
                    }`}>
                      {activity.title}
                    </p>
                    <p className={`text-muted-foreground mt-1 ${
                      isCompact ? 'text-xs' : 'text-sm'
                    }`}>
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-muted-foreground ${
                        isCompact ? 'text-xs' : 'text-sm'
                      }`}>
                        {activity.user}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className={`text-muted-foreground ${
                        isCompact ? 'text-xs' : 'text-sm'
                      }`}>
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                  <div className="ml-2">
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <Button variant="ghost" size="sm" className="text-xs">
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
