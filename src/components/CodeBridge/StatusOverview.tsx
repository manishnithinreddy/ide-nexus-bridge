
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { codeBridgeApi } from '@/services/codeBridgeApi';
import { CheckCircle, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

interface StatusOverviewProps {
  containerSize?: string;
}

export const StatusOverview: React.FC<StatusOverviewProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';

  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: () => codeBridgeApi.getServices(),
  });

  // Enhanced metrics
  const stats = {
    totalServices: 9,
    onlineServices: 8,
    warningServices: 1,
    uptime: 99.8,
    activeRequests: 156,
    responseTime: '45ms',
    totalUsers: 23,
    apiCalls: '2.3K'
  };

  const statusItems = [
    {
      label: 'Services Online',
      value: `${stats.onlineServices}/${stats.totalServices}`,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Uptime',
      value: `${stats.uptime}%`,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Response Time',
      value: stats.responseTime,
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Active Users',
      value: stats.totalUsers.toString(),
      icon: CheckCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <Card className="bg-card border-border">
      <div className={`${isCompact ? 'p-4' : 'p-6'}`}>
        <h3 className={`font-semibold text-foreground mb-4 ${
          isCompact ? 'text-base' : 'text-lg'
        }`}>
          Platform Status
        </h3>
        
        {/* Overall Status */}
        <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg mb-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <span className={`font-medium text-foreground ${
                isCompact ? 'text-sm' : 'text-base'
              }`}>
                System Operational
              </span>
              {!isCompact && (
                <p className="text-xs text-muted-foreground">
                  All core services are running normally
                </p>
              )}
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
            {stats.uptime}% Uptime
          </Badge>
        </div>
        
        {/* Metrics Grid */}
        <div className={`grid gap-3 mb-4 ${
          isCompact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'
        }`}>
          {statusItems.map((item, index) => (
            <div key={index} className="text-center p-3 rounded-lg bg-muted/30">
              <div className={`text-lg font-bold text-foreground ${
                isCompact ? 'text-base' : 'text-xl'
              }`}>
                {item.value}
              </div>
              <div className={`text-muted-foreground ${
                isCompact ? 'text-xs' : 'text-sm'
              }`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <div className={`grid gap-3 mb-4 ${
          isCompact ? 'grid-cols-2' : 'grid-cols-2'
        }`}>
          <div className="text-center p-3 rounded-lg bg-blue-500/10">
            <div className={`text-lg font-bold text-blue-600 ${
              isCompact ? 'text-base' : 'text-xl'
            }`}>
              {stats.apiCalls}
            </div>
            <div className={`text-muted-foreground ${
              isCompact ? 'text-xs' : 'text-sm'
            }`}>
              API Calls Today
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-500/10">
            <div className={`text-lg font-bold text-purple-600 ${
              isCompact ? 'text-base' : 'text-xl'
            }`}>
              {stats.activeRequests}
            </div>
            <div className={`text-muted-foreground ${
              isCompact ? 'text-xs' : 'text-sm'
            }`}>
              Active Requests
            </div>
          </div>
        </div>

        {/* Services Health Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-muted-foreground ${
              isCompact ? 'text-xs' : 'text-sm'
            }`}>
              Services Health
            </span>
            <span className={`text-foreground font-medium ${
              isCompact ? 'text-xs' : 'text-sm'
            }`}>
              {Math.round((stats.onlineServices / stats.totalServices) * 100)}%
            </span>
          </div>
          <Progress 
            value={(stats.onlineServices / stats.totalServices) * 100} 
            className="h-2"
          />
          {stats.warningServices > 0 && (
            <div className="flex items-center space-x-2 mt-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className={`text-yellow-600 ${
                isCompact ? 'text-xs' : 'text-sm'
              }`}>
                {stats.warningServices} service needs attention
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
