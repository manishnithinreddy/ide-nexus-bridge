
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code2,
  Zap,
  Plus,
  Play,
  GitPullRequest,
  Database,
  Container,
  Terminal,
  Users,
  Activity,
  Shield,
  FileText
} from 'lucide-react';

interface QuickActionsProps {
  containerSize?: string;
  onActionClick: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ containerSize, onActionClick }) => {
  const isCompact = containerSize === 'compact';

  const actions = [
    { 
      id: 'generate-code', 
      label: 'Generate Code', 
      icon: Code2, 
      color: 'bg-purple-500 hover:bg-purple-600 text-white',
      description: 'AI Code Gen'
    },
    { 
      id: 'test-api', 
      label: 'Test API', 
      icon: Zap, 
      color: 'bg-green-500 hover:bg-green-600 text-white',
      description: 'REST & GraphQL'
    },
    { 
      id: 'new-project', 
      label: 'New Project', 
      icon: Plus, 
      color: 'bg-blue-500 hover:bg-blue-600 text-white',
      description: 'Create Project'
    },
    { 
      id: 'run-container', 
      label: 'Run Container', 
      icon: Play, 
      color: 'bg-cyan-500 hover:bg-cyan-600 text-white',
      description: 'Docker Deploy'
    },
    { 
      id: 'create-mr', 
      label: 'Create MR', 
      icon: GitPullRequest, 
      color: 'bg-orange-500 hover:bg-orange-600 text-white',
      description: 'GitLab MR'
    },
    { 
      id: 'query-db', 
      label: 'Query DB', 
      icon: Database, 
      color: 'bg-pink-500 hover:bg-pink-600 text-white',
      description: 'Database Query'
    },
  ];

  return (
    <Card className="bg-card border-border">
      <div className={`${isCompact ? 'p-4' : 'p-6'}`}>
        <h3 className={`font-semibold text-foreground mb-4 ${
          isCompact ? 'text-base' : 'text-lg'
        }`}>
          Quick Actions
        </h3>
        
        <div className={`grid gap-3 ${
          isCompact 
            ? 'grid-cols-2' 
            : 'grid-cols-2 sm:grid-cols-3'
        }`}>
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className={`${action.color} ${
                isCompact ? 'h-16 p-3' : 'h-20 p-4'
              } flex flex-col items-center justify-center space-y-1 transition-all duration-200 hover:scale-105`}
            >
              <action.icon className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'}`} />
              <div className="text-center">
                <div className={`font-medium ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  {isCompact ? action.label.split(' ')[0] : action.label}
                </div>
                {!isCompact && (
                  <div className="text-xs opacity-80">
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
