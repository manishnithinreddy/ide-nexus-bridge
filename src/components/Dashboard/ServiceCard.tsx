
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'online' | 'offline' | 'warning';
  metrics?: { label: string; value: string }[];
  actions?: { label: string; onClick: () => void }[];
  color: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  status,
  metrics = [],
  actions = [],
  color,
}) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    warning: 'bg-yellow-500',
  };

  const statusLabels = {
    online: 'Online',
    offline: 'Offline',
    warning: 'Warning',
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={cn('p-2 rounded-lg', `bg-${color}-500/10`)}>
              <Icon className={cn('h-6 w-6', `text-${color}-400`)} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          </div>
          <Badge className={cn('text-xs', statusColors[status])}>
            <div className={cn('w-2 h-2 rounded-full mr-2', statusColors[status])} />
            {statusLabels[status]}
          </Badge>
        </div>

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex space-x-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant="outline"
                size="sm"
                className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
