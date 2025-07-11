
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { codeBridgeApi } from '@/services/codeBridgeApi';
import { CheckCircle, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

export const StatusOverview: React.FC = () => {
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: () => codeBridgeApi.getServices(),
  });

  const stats = {
    totalServices: 7,
    onlineServices: 6,
    warningServices: 1,
    uptime: 99.8,
    activeRequests: 156,
    responseTime: '45ms',
    totalUsers: 23,
    apiCalls: '2.3K'
  };

  return (
    <Card className="bg-card border-border">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Platform Status
        </h3>
        
        <div className="flex items-center justify-between p-4 mb-4 bg-green-500/10 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <span className="font-medium text-foreground">
                System Operational
              </span>
              <p className="text-xs text-muted-foreground">
                All core services are running normally
              </p>
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
            {stats.uptime}% Uptime
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-xl font-bold text-foreground">
              {stats.onlineServices}/{stats.totalServices}
            </div>
            <div className="text-sm text-muted-foreground">
              Services Online
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-xl font-bold text-foreground">
              {stats.responseTime}
            </div>
            <div className="text-sm text-muted-foreground">
              Response Time
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-xl font-bold text-foreground">
              {stats.totalUsers}
            </div>
            <div className="text-sm text-muted-foreground">
              Active Users
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-xl font-bold text-foreground">
              {stats.apiCalls}
            </div>
            <div className="text-sm text-muted-foreground">
              API Calls Today
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Services Health
            </span>
            <span className="text-sm font-medium text-foreground">
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
              <span className="text-sm text-yellow-600">
                {stats.warningServices} service needs attention
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
