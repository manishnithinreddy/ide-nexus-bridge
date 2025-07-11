
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Server, 
  GitBranch, 
  Container, 
  Shield, 
  Users, 
  Activity, 
  Database,
  Brain,
  FileText,
  Network,
  ExternalLink
} from 'lucide-react';
import { CodeBridgeService } from '@/types/codebridge';

interface ServiceGridProps {
  services: CodeBridgeService[];
  onServiceClick: (service: CodeBridgeService) => void;
  containerSize?: string;
}

const serviceIcons = {
  gateway: Network,
  docker: Container,
  gitlab: GitBranch,
  security: Shield,
  teams: Users,
  monitoring: Activity,
  server: Server,
  ai: Brain,
  documentation: FileText,
};

const serviceColors = {
  gateway: 'blue',
  docker: 'cyan',
  gitlab: 'orange',
  security: 'green',
  teams: 'purple',
  monitoring: 'red',
  server: 'yellow',
  ai: 'pink',
  documentation: 'indigo',
};

export const ServiceGrid: React.FC<ServiceGridProps> = ({ 
  services, 
  onServiceClick, 
  containerSize 
}) => {
  const isCompact = containerSize === 'compact';
  const isMedium = containerSize === 'medium';

  // If only one service, render as a single card
  if (services.length === 1) {
    const service = services[0];
    const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons] || Server;
    const color = serviceColors[service.id as keyof typeof serviceColors] || 'blue';
    
    return (
      <Card 
        className="bg-card border-border hover:border-primary/50 transition-all duration-200 cursor-pointer group h-full"
        onClick={() => onServiceClick(service)}
      >
        <div className={`${isCompact ? 'p-4' : 'p-6'} h-full flex flex-col`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className={`p-2 rounded-lg bg-${color}-500/10 flex-shrink-0`}>
                <IconComponent className={`${isCompact ? 'h-5 w-5' : 'h-6 w-6'} text-${color}-600`} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-semibold text-foreground truncate ${
                  isCompact ? 'text-base' : 'text-lg'
                }`}>
                  {service.name}
                </h3>
              </div>
            </div>
            <Badge 
              variant={service.status === 'online' ? 'default' : 'destructive'}
              className={`flex-shrink-0 ${isCompact ? 'text-xs' : ''}`}
            >
              {service.status}
            </Badge>
          </div>
          
          {/* Description */}
          <p className={`text-muted-foreground mb-4 flex-1 ${
            isCompact ? 'text-sm' : 'text-base'
          }`}>
            {service.description}
          </p>
          
          {/* Endpoints count */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className={`text-muted-foreground ${
              isCompact ? 'text-xs' : 'text-sm'
            }`}>
              {service.endpoints.length} endpoint{service.endpoints.length !== 1 ? 's' : ''}
            </span>
            <Button 
              size={isCompact ? 'sm' : 'default'} 
              variant="outline"
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onServiceClick(service);
              }}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Manage
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Grid layout for multiple services
  return (
    <div className={`grid gap-4 ${
      isCompact 
        ? 'grid-cols-1 sm:grid-cols-2' 
        : isMedium
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {services.map((service) => {
        const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons] || Server;
        const color = serviceColors[service.id as keyof typeof serviceColors] || 'blue';
        
        return (
          <Card 
            key={service.id} 
            className="bg-card border-border hover:border-primary/50 transition-all duration-200 cursor-pointer group"
            onClick={() => onServiceClick(service)}
          >
            <div className={`${isCompact ? 'p-4' : 'p-6'} space-y-4`}>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`p-2 rounded-lg bg-${color}-500/10 flex-shrink-0`}>
                    <IconComponent className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'} text-${color}-600`} />
                  </div>
                  <h3 className={`font-medium text-foreground truncate ${
                    isCompact ? 'text-sm' : 'text-base'
                  }`}>
                    {service.name}
                  </h3>
                </div>
                <Badge 
                  variant={service.status === 'online' ? 'default' : 'destructive'}
                  className={`flex-shrink-0 ${isCompact ? 'text-xs px-1 py-0' : ''}`}
                >
                  {service.status}
                </Badge>
              </div>
              
              {/* Description */}
              <p className={`text-muted-foreground line-clamp-2 ${
                isCompact ? 'text-xs' : 'text-sm'
              }`}>
                {service.description}
              </p>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <span className={`text-muted-foreground ${
                  isCompact ? 'text-xs' : 'text-sm'
                }`}>
                  {service.endpoints.length} endpoint{service.endpoints.length !== 1 ? 's' : ''}
                </span>
                <Button 
                  size={isCompact ? 'sm' : 'default'} 
                  variant="outline"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onServiceClick(service);
                  }}
                >
                  Manage
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
