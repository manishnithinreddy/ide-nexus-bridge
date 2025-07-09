
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GitCommit, 
  Container, 
  Zap, 
  Server, 
  Database,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'git',
    icon: GitCommit,
    title: 'Merged pull request #42',
    description: 'Feature/user-authentication into main',
    time: '2 minutes ago',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: 2,
    type: 'docker',
    icon: Container,
    title: 'Container deployed',
    description: 'api-service:v1.2.3 successfully deployed',
    time: '5 minutes ago',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    id: 3,
    type: 'api',
    icon: Zap,
    title: 'API test completed',
    description: 'Authentication endpoints - 12/12 passed',
    time: '10 minutes ago',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 4,
    type: 'server',
    icon: Server,
    title: 'Server health check',
    description: 'prod-server-01 - All systems operational',
    time: '15 minutes ago',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 5,
    type: 'database',
    icon: Database,
    title: 'Database backup completed',
    description: 'users_db - 2.3GB backed up successfully',
    time: '1 hour ago',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
  },
];

export const RecentActivity = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <Badge variant="outline" className="text-gray-400 border-gray-600">
            Live
          </Badge>
        </div>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={cn('p-2 rounded-lg flex-shrink-0', activity.bgColor)}>
                <activity.icon className={cn('h-4 w-4', activity.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{activity.title}</p>
                <p className="text-xs text-gray-400 truncate">{activity.description}</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-3 w-3 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
