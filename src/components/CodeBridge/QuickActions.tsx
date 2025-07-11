
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  GitBranch, 
  Terminal, 
  Users, 
  Activity,
  Shield,
  Container,
  Zap
} from 'lucide-react';

interface QuickActionsProps {
  containerSize?: string;
  onActionClick: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ containerSize, onActionClick }) => {
  const isCompact = containerSize === 'compact';

  const actions = [
    { 
      id: 'containers', 
      label: 'Containers', 
      icon: Container, 
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Manage Docker'
    },
    { 
      id: 'gitlab', 
      label: 'CI/CD', 
      icon: GitBranch, 
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'GitLab Jobs'
    },
    { 
      id: 'servers', 
      label: 'SSH', 
      icon: Terminal, 
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Remote Access'
    },
    { 
      id: 'teams', 
      label: 'Teams', 
      icon: Users, 
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Manage Teams'
    },
    { 
      id: 'monitoring', 
      label: 'Monitor', 
      icon: Activity, 
      color: 'bg-red-500 hover:bg-red-600',
      description: 'View Metrics'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: Shield, 
      color: 'bg-yellow-500 hover:bg-yellow-600',
      description: 'API Keys'
    },
  ];

  return (
    <Card className="bg-card border-border">
      <div className={`${isCompact ? 'p-3' : 'p-4'} space-y-4`}>
        <h3 className={`font-medium text-foreground ${isCompact ? 'text-sm' : 'text-base'}`}>
          Quick Actions
        </h3>
        
        <div className={`grid gap-2 ${
          isCompact 
            ? 'grid-cols-2' 
            : 'grid-cols-2 sm:grid-cols-3'
        }`}>
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              onClick={() => onActionClick(action.id)}
              className={`${
                isCompact ? 'h-12 p-2' : 'h-16 p-3'
              } flex flex-col items-center justify-center space-y-1 hover:bg-muted transition-colors group`}
            >
              <action.icon className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'} text-primary group-hover:text-primary`} />
              <div className="text-center">
                <div className={`font-medium text-foreground ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  {action.label}
                </div>
                {!isCompact && (
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
