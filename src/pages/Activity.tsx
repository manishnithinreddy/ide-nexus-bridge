
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Activity as ActivityIcon, 
  GitCommit, 
  GitPullRequest, 
  Container, 
  Database,
  Zap,
  Users,
  Search,
  Filter,
  Clock
} from 'lucide-react';

export const Activity = () => {
  const [activities] = useState([
    {
      id: 1,
      type: 'git_commit',
      user: 'John Doe',
      action: 'pushed 3 commits to',
      target: 'codeBridge/main',
      timestamp: '2 minutes ago',
      details: 'feat: add AI integration endpoints'
    },
    {
      id: 2,
      type: 'docker_deploy',
      user: 'Jane Smith',
      action: 'deployed container',
      target: 'codebridge-api:latest',
      timestamp: '15 minutes ago',
      details: 'Production deployment successful'
    },
    {
      id: 3,
      type: 'api_test',
      user: 'Mike Wilson',
      action: 'ran API test collection',
      target: 'Authentication Tests',
      timestamp: '1 hour ago',
      details: '12/12 tests passed'
    },
    {
      id: 4,
      type: 'db_query',
      user: 'Sarah Johnson',
      action: 'executed database query',
      target: 'Production DB',
      timestamp: '2 hours ago',
      details: 'User analytics report generated'
    },
    {
      id: 5,
      type: 'merge_request',
      user: 'John Doe',
      action: 'created merge request',
      target: 'feature/code-generation',
      timestamp: '3 hours ago',
      details: 'Add code generation service endpoints'
    },
    {
      id: 6,
      type: 'server_alert',
      user: 'System',
      action: 'server alert triggered',
      target: 'Production Server',
      timestamp: '4 hours ago',
      details: 'High memory usage detected'
    },
    {
      id: 7,
      type: 'team_join',
      user: 'Alex Brown',
      action: 'joined the team',
      target: 'DevOps Team',
      timestamp: '1 day ago',
      details: 'Welcome to the team!'
    },
    {
      id: 8,
      type: 'docker_build',
      user: 'Mike Wilson',
      action: 'built Docker image',
      target: 'postgres-db:15',
      timestamp: '1 day ago',
      details: 'Build completed successfully'
    }
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'git_commit': return <GitCommit className="h-4 w-4 text-green-400" />;
      case 'merge_request': return <GitPullRequest className="h-4 w-4 text-blue-400" />;
      case 'docker_deploy':
      case 'docker_build': return <Container className="h-4 w-4 text-cyan-400" />;
      case 'db_query': return <Database className="h-4 w-4 text-pink-400" />;
      case 'api_test': return <Zap className="h-4 w-4 text-green-400" />;
      case 'server_alert': return <ActivityIcon className="h-4 w-4 text-yellow-400" />;
      case 'team_join': return <Users className="h-4 w-4 text-purple-400" />;
      default: return <ActivityIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'git_commit': return 'border-green-500/20 bg-green-500/5';
      case 'merge_request': return 'border-blue-500/20 bg-blue-500/5';
      case 'docker_deploy':
      case 'docker_build': return 'border-cyan-500/20 bg-cyan-500/5';
      case 'db_query': return 'border-pink-500/20 bg-pink-500/5';
      case 'api_test': return 'border-green-500/20 bg-green-500/5';
      case 'server_alert': return 'border-yellow-500/20 bg-yellow-500/5';
      case 'team_join': return 'border-purple-500/20 bg-purple-500/5';
      default: return 'border-gray-500/20 bg-gray-500/5';
    }
  };

  const formatActivityType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'git_commit': 'Git Commit',
      'merge_request': 'Merge Request',
      'docker_deploy': 'Docker Deploy',
      'docker_build': 'Docker Build',
      'db_query': 'Database Query',
      'api_test': 'API Test',
      'server_alert': 'Server Alert',
      'team_join': 'Team Join'
    };
    return typeMap[type] || type;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Activity Feed</h1>
          <p className="text-gray-400">Track team activities and system events</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            Timeline
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search activities..." 
            className="pl-10 bg-gray-800 border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <GitCommit className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Git Activities</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-cyan-500/20 p-2 rounded-lg">
              <Container className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Deployments</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-pink-500/20 p-2 rounded-lg">
              <Database className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">DB Queries</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">API Tests</p>
              <p className="text-2xl font-bold text-white">342</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {activities.map((activity) => (
            <div key={activity.id} className={`p-4 ${getActivityColor(activity.type)}`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-700 text-white text-xs">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium">{activity.user}</span>{' '}
                        <span className="text-gray-300">{activity.action}</span>{' '}
                        <span className="font-medium text-blue-400">{activity.target}</span>
                      </p>
                      <p className="text-gray-400 text-sm mt-1">{activity.details}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {formatActivityType(activity.type)}
                      </Badge>
                      <span className="text-gray-400 text-sm">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-700 text-center">
          <Button variant="outline" className="border-gray-600">
            Load More Activities
          </Button>
        </div>
      </Card>
    </div>
  );
};
