
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  GitCommit, 
  GitPullRequest, 
  Container, 
  Zap,
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
      type: 'commit',
      title: 'Fixed authentication bug in user service',
      user: 'John Doe',
      time: '2 hours ago',
      icon: GitCommit,
      color: 'text-green-400',
      badge: 'GitLab'
    },
    {
      id: 2,
      type: 'merge',
      title: 'Merged feature/new-dashboard branch',
      user: 'Jane Smith',
      time: '4 hours ago',
      icon: GitPullRequest,
      color: 'text-blue-400',
      badge: 'GitLab'
    },
    {
      id: 3,
      type: 'deploy',
      title: 'Deployed web-app:v2.1.0 to production',
      user: 'DevOps Bot',
      time: '6 hours ago',
      icon: Container,
      color: 'text-cyan-400',
      badge: 'Docker'
    },
    {
      id: 4,
      type: 'test',
      title: 'API test suite completed successfully',
      user: 'Test Runner',
      time: '8 hours ago',
      icon: Zap,
      color: 'text-yellow-400',
      badge: 'Testing'
    }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <div className={isCompact ? 'p-3' : 'p-6'}>
        <h3 className={`font-semibold text-white mb-${isCompact ? '2' : '4'} ${isCompact ? 'text-sm' : 'text-lg'}`}>
          Recent Activity
        </h3>
        <div className={`space-y-${isCompact ? '2' : '4'}`}>
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-gray-700 ${isCompact ? 'p-1' : 'p-2'}`}>
                <activity.icon className={`${isCompact ? 'h-3 w-3' : 'h-4 w-4'} ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-white font-medium ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    {activity.title}
                  </p>
                  <Badge variant="outline" className={`${isCompact ? 'text-xs px-1 py-0' : ''}`}>
                    {activity.badge}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Avatar className={isCompact ? 'h-4 w-4' : 'h-6 w-6'}>
                    <AvatarImage src={`/avatars/${activity.user.toLowerCase().replace(' ', '-')}.png`} />
                    <AvatarFallback className={`${isCompact ? 'text-xs' : 'text-sm'}`}>
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`text-gray-400 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    {activity.user}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Clock className={`${isCompact ? 'h-3 w-3' : 'h-4 w-4'} text-gray-500`} />
                    <span className={`text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
