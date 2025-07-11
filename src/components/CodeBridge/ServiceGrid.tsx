
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
  FileText
} from 'lucide-react';
import { CodeBridgeService } from '@/types/codebridge';

interface ServiceGridProps {
  services: CodeBridgeService[];
  onServiceClick: (service: CodeBridgeService) => void;
  containerSize?: string;
}

const serviceIcons = {
  gateway: Server,
  docker: Container,
  gitlab: GitBranch,
  security: Shield,
  teams: Users,
  monitoring: Activity,
  server: Database,
  ai: Brain,
  documentation: FileText,
};

export const ServiceGrid: React.FC<ServiceGridProps> = ({ 
  services, 
  onServiceClick, 
  containerSize 
}) => {
  const isCompact = containerSize === 'compact';

  return (
    <div className={`grid gap-4 ${
      isCompact 
        ? 'grid-cols-1 sm:grid-cols-2' 
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {services.map((service) => {
        const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons] || Server;
        
        return (
          <Card 
            key={service.id} 
            className="bg-card border-border hover:border-primary/50 transition-all duration-200 cursor-pointer group"
            onClick={() => onServiceClick(service)}
          >
            <div className={`${isCompact ? 'p-3' : 'p-4'} space-y-3`}>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <IconComponent className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'} text-primary flex-shrink-0`} />
                  <h3 className={`font-medium text-foreground truncate ${isCompact ? 'text-sm' : 'text-base'}`}>
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
              <p className={`text-muted-foreground line-clamp-2 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                {service.description}
              </p>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <span className={`text-muted-foreground ${isCompact ? 'text-xs' : 'text-sm'}`}>
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
