
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity as ActivityIcon, 
  GitCommit, 
  Container, 
  Zap, 
  Server, 
  Database,
  Clock,
  User,
  Calendar,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityProps {
  containerSize?: string;
}

export const Activity: React.FC<ActivityProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';

  const activities = [
    {
      id: 1,
      type: 'git',
      icon: GitCommit,
      title: 'Merged pull request #42',
      description: 'Feature/user-authentication into main',
      user: 'john.doe',
      time: '2 minutes ago',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      category: 'development'
    },
    {
      id: 2,
      type: 'docker',
      icon: Container,
      title: 'Container deployed',
      description: 'api-service:v1.2.3 successfully deployed to production',
      user: 'jane.smith',
      time: '5 minutes ago',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      category: 'deployment'
    },
    {
      id: 3,
      type: 'api',
      icon: Zap,
      title: 'API test completed',
      description: 'Authentication endpoints - 12/12 tests passed',
      user: 'bob.wilson',
      time: '10 minutes ago',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      category: 'testing'
    },
    {
      id: 4,
      type: 'server',
      icon: Server,
      title: 'Server health check',
      description: 'prod-server-01 - All systems operational',
      user: 'system',
      time: '15 minutes ago',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      category: 'monitoring'
    },
    {
      id: 5,
      type: 'database',
      icon: Database,
      title: 'Database backup completed',
      description: 'users_db - 2.3GB backed up successfully',
      user: 'alice.johnson',
      time: '1 hour ago',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      category: 'maintenance'
    },
    {
      id: 6,
      type: 'git',
      icon: GitCommit,
      title: 'New branch created',
      description: 'feature/payment-integration created from main',
      user: 'john.doe',
      time: '2 hours ago',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      category: 'development'
    },
    {
      id: 7,
      type: 'server',
      icon: Server,
      title: 'Security patch applied',
      description: 'Critical security update installed on staging-server-02',
      user: 'bob.wilson',
      time: '3 hours ago',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      category: 'security'
    },
    {
      id: 8,
      type: 'api',
      icon: Zap,
      title: 'Performance test completed',
      description: 'Load test - 1000 concurrent users, avg response 120ms',
      user: 'jane.smith',
      time: '4 hours ago',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      category: 'testing'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All', count: activities.length },
    { id: 'development', label: 'Development', count: activities.filter(a => a.category === 'development').length },
    { id: 'deployment', label: 'Deployment', count: activities.filter(a => a.category === 'deployment').length },
    { id: 'testing', label: 'Testing', count: activities.filter(a => a.category === 'testing').length },
    { id: 'monitoring', label: 'Monitoring', count: activities.filter(a => a.category === 'monitoring').length },
    { id: 'maintenance', label: 'Maintenance', count: activities.filter(a => a.category === 'maintenance').length },
    { id: 'security', label: 'Security', count: activities.filter(a => a.category === 'security').length },
  ];

  return (
    <div className={`space-y-${isCompact ? '3' : '6'} ${isCompact ? 'p-3' : 'p-6'}`}>
      <div>
        <h1 className={`font-bold text-white mb-2 flex items-center gap-3 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
          <ActivityIcon className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8'} text-green-400`} />
          Activity Feed
        </h1>
        <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
          {isCompact ? 'Track system activities' : 'Track all system activities, deployments, and team actions'}
        </p>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="recent" className={isCompact ? 'text-xs px-2' : ''}>Recent</TabsTrigger>
          <TabsTrigger value="filtered" className={isCompact ? 'text-xs px-2' : ''}>Filtered</TabsTrigger>
          <TabsTrigger value="analytics" className={isCompact ? 'text-xs px-2' : ''}>Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>Recent Activity</h3>
                <Badge variant="outline" className="text-gray-400 border-gray-600">
                  Live
                </Badge>
              </div>
              <div className="space-y-4">
                {activities.slice(0, isCompact ? 5 : 8).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={cn('p-2 rounded-lg flex-shrink-0', activity.bgColor)}>
                      <activity.icon className={cn('h-4 w-4', activity.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-white ${isCompact ? 'text-sm' : 'text-base'}`}>
                        {activity.title}
                      </p>
                      <p className={`text-gray-400 truncate ${isCompact ? 'text-xs' : 'text-sm'}`}>
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-1 space-x-3">
                        <div className="flex items-center">
                          <User className="h-3 w-3 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">{activity.user}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {activity.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="filtered" className="space-y-4">
          {/* Category Filter */}
          <Card className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="flex items-center mb-3">
                <Filter className="h-4 w-4 text-gray-400 mr-2" />
                <span className={`font-medium text-white ${isCompact ? 'text-sm' : 'text-base'}`}>
                  Filter by Category
                </span>
              </div>
              <div className={`flex flex-wrap gap-2 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-blue-600 text-white' 
                        : 'border-gray-600 text-gray-400 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label} ({category.count})
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Filtered Results */}
          <Card className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={cn('p-2 rounded-lg flex-shrink-0', activity.bgColor)}>
                      <activity.icon className={cn('h-4 w-4', activity.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-white ${isCompact ? 'text-sm' : 'text-base'}`}>
                        {activity.title}
                      </p>
                      <p className={`text-gray-400 truncate ${isCompact ? 'text-xs' : 'text-sm'}`}>
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-1 space-x-3">
                        <div className="flex items-center">
                          <User className="h-3 w-3 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">{activity.user}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Activity Analytics</h3>
            <p className="text-gray-400">
              {isCompact 
                ? 'Detailed activity insights' 
                : 'Detailed insights and analytics about team and system activities'
              }
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
