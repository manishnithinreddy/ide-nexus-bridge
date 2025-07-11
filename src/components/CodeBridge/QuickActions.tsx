
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code2,
  Zap,
  Plus,
  Play,
  GitPullRequest,
  Database
} from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    { 
      id: 'generate-code', 
      label: 'Generate Code', 
      icon: Code2, 
      color: 'bg-purple-500 hover:bg-purple-600 text-white',
      description: 'AI Code Generation'
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
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className={`${action.color} h-20 p-4 flex flex-col items-center justify-center space-y-1 transition-all duration-200 hover:scale-105`}
            >
              <action.icon className="h-5 w-5" />
              <div className="text-center">
                <div className="font-medium text-sm">
                  {action.label}
                </div>
                <div className="text-xs opacity-80">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
