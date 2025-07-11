
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { codeBridgeApi } from '@/services/codeBridgeApi';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface StatusOverviewProps {
  containerSize?: string;
}

export const StatusOverview: React.FC<StatusOverviewProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';

  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: () => codeBridgeApi.getServices(),
  });

  // Mock data for demo
  const onlineServices = 6;
  const totalServices = 6;
  const uptime = 100;
  const activeRequests = 42;

  const statusItems = [
    {
      label: 'System Status',
      value: 'Operational',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Services Online',
      value: `${onlineServices}/${totalServices}`,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Uptime',
      value: `${uptime}%`,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Active Requests',
      value: activeRequests.toString(),
      icon: AlertTriangle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    }
  ];

  return (
    <Card className="bg-card border-border">
      <div className={`${isCompact ? 'p-3' : 'p-4'} space-y-4`}>
        <h3 className={`font-medium text-foreground ${isCompact ? 'text-sm' : 'text-base'}`}>
          System Status
        </h3>
        
        {/* Overall Status */}
        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-md">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className={`font-medium text-foreground ${isCompact ? 'text-sm' : 'text-base'}`}>
              All Systems Operational
            </span>
          </div>
          <Badge variant="outline" className="bg-green-500/20 text-green-700 border-green-500/30">
            {uptime}% Uptime
          </Badge>
        </div>
        
        {/* Status Grid */}
        <div className={`grid gap-3 ${
          isCompact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'
        }`}>
          {statusItems.slice(1).map((item, index) => (
            <div key={index} className="text-center p-2 rounded-md bg-muted/50">
              <div className={`text-lg font-bold text-foreground ${isCompact ? 'text-base' : 'text-xl'}`}>
                {item.value}
              </div>
              <div className={`text-muted-foreground ${isCompact ? 'text-xs' : 'text-sm'}`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Services Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-muted-foreground ${isCompact ? 'text-xs' : 'text-sm'}`}>
              Services Health
            </span>
            <span className={`text-foreground font-medium ${isCompact ? 'text-xs' : 'text-sm'}`}>
              {onlineServices}/{totalServices}
            </span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </div>
    </Card>
  );
};
