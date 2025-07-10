
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { codeBridgeApi } from '@/services/codeBridgeApi';

interface StatusOverviewProps {
  containerSize?: string;
}

export const StatusOverview: React.FC<StatusOverviewProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';

  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: () => codeBridgeApi.getServices(),
  });

  const { data: metrics = [] } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => codeBridgeApi.getMetrics(),
  });

  const onlineServices = services.filter(s => s.status === 'online').length;
  const totalServices = services.length;
  const uptime = totalServices > 0 ? (onlineServices / totalServices) * 100 : 0;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <div className={isCompact ? 'p-3' : 'p-4'}>
        <h3 className={`font-semibold text-white mb-4 ${isCompact ? 'text-sm' : 'text-lg'}`}>
          System Status
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-gray-300 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Services Online
              </span>
              <Badge variant={uptime > 80 ? 'default' : 'destructive'}>
                {onlineServices}/{totalServices}
              </Badge>
            </div>
            <Progress value={uptime} className="h-2" />
          </div>
          
          <div className={`grid grid-cols-2 gap-${isCompact ? '2' : '4'}`}>
            <div className="text-center">
              <div className={`text-${isCompact ? 'lg' : 'xl'} font-bold text-green-400`}>
                {metrics.filter(m => m.service === 'gateway').length}
              </div>
              <div className={`text-gray-400 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Active Requests
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-${isCompact ? 'lg' : 'xl'} font-bold text-blue-400`}>
                {Math.round(uptime)}%
              </div>
              <div className={`text-gray-400 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Uptime
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
