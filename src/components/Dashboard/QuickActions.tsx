
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Play, 
  GitPullRequest, 
  Zap, 
  Database,
  Upload,
  Code2
} from 'lucide-react';

const quickActions = [
  { icon: Code2, label: 'Generate Code', color: 'bg-purple-500 hover:bg-purple-600', route: '/code-bridge' },
  { icon: Zap, label: 'Test API', color: 'bg-green-500 hover:bg-green-600', route: '/api-testing' },
  { icon: Plus, label: 'New Project', color: 'bg-blue-500 hover:bg-blue-600' },
  { icon: Play, label: 'Run Container', color: 'bg-cyan-500 hover:bg-cyan-600' },
  { icon: GitPullRequest, label: 'Create MR', color: 'bg-orange-500 hover:bg-orange-600' },
  { icon: Database, label: 'Query DB', color: 'bg-pink-500 hover:bg-pink-600' },
];

interface QuickActionsProps {
  containerSize?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ containerSize }) => {
  const navigate = useNavigate();
  const isCompact = containerSize === 'compact';

  const handleAction = (action: typeof quickActions[0]) => {
    if (action.route) {
      navigate(action.route);
    } else {
      console.log(`${action.label} clicked`);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <div className={isCompact ? 'p-3' : 'p-6'}>
        <h3 className={`font-semibold text-white mb-${isCompact ? '2' : '4'} ${isCompact ? 'text-sm' : 'text-lg'}`}>
          Quick Actions
        </h3>
        <div className={`grid gap-${isCompact ? '2' : '3'} ${
          isCompact 
            ? 'grid-cols-2' 
            : 'grid-cols-2 md:grid-cols-3'
        }`}>
          {quickActions.map((action, index) => (
            <Button
              key={index}
              className={`${action.color} text-white flex items-center justify-center space-x-2 ${
                isCompact ? 'h-8 text-xs' : 'h-12'
              }`}
              onClick={() => handleAction(action)}
            >
              <action.icon className={isCompact ? 'h-3 w-3' : 'h-5 w-5'} />
              <span className={`${isCompact ? 'hidden sm:inline text-xs' : 'hidden sm:inline'}`}>
                {isCompact ? action.label.split(' ')[0] : action.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
