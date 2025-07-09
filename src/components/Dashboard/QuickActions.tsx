
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

export const QuickActions = () => {
  const navigate = useNavigate();

  const handleAction = (action: typeof quickActions[0]) => {
    if (action.route) {
      navigate(action.route);
    } else {
      console.log(`${action.label} clicked`);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              className={`${action.color} text-white flex items-center justify-center space-x-2 h-12`}
              onClick={() => handleAction(action)}
            >
              <action.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
