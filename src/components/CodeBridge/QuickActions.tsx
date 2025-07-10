
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Square, 
  GitBranch, 
  Terminal, 
  Users, 
  Activity,
  Shield,
  Database
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
      label: 'Docker Containers', 
      icon: Play, 
      color: 'text-blue-400',
      description: 'Manage containers'
    },
    { 
      id: 'gitlab', 
      label: 'GitLab Jobs', 
      icon: GitBranch, 
      color: 'text-orange-400',
      description: 'Trigger CI/CD'
    },
    { 
      id: 'servers', 
      label: 'SSH Servers', 
      icon: Terminal, 
      color: 'text-green-400',
      description: 'Remote access'
    },
    { 
      id: 'teams', 
      label: 'Teams', 
      icon: Users, 
      color: 'text-purple-400',
      description: 'Manage teams'
    },
    { 
      id: 'monitoring', 
      label: 'Monitoring', 
      icon: Activity, 
      color: 'text-red-400',
      description: 'View metrics'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: Shield, 
      color: 'text-yellow-400',
      description: 'API keys & auth'
    },
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <div className={isCompact ? 'p-3' : 'p-4'}>
        <h3 className={`font-semibold text-white mb-4 ${isCompact ? 'text-sm' : 'text-lg'}`}>
          Quick Actions
        </h3>
        
        <div className={`grid gap-${isCompact ? '2' : '3'} ${
          isCompact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'
        }`}>
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              onClick={() => onActionClick(action.id)}
              className={`${isCompact ? 'p-2 h-auto' : 'p-3 h-auto'} flex flex-col items-start space-y-1 bg-gray-700 hover:bg-gray-600 border border-gray-600`}
            >
              <div className="flex items-center space-x-2 w-full">
                <action.icon className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'} ${action.color}`} />
                <span className={`text-white font-medium ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  {action.label}
                </span>
              </div>
              <span className={`text-gray-400 ${isCompact ? 'text-xs' : 'text-xs'}`}>
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
