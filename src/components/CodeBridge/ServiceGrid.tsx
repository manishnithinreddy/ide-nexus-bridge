
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
  onServiceClick
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {services.map((service) => {
        const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons] || Server;
        const color = serviceColors[service.id as keyof typeof serviceColors] || 'blue';
        
        return (
          <Card 
            key={service.id} 
            className="bg-card border-border hover:border-primary/50 transition-all duration-200 cursor-pointer group"
            onClick={() => onServiceClick(service)}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${color}-500/10`}>
                    <IconComponent className={`h-5 w-5 text-${color}-600`} />
                  </div>
                  <h3 className="font-medium text-foreground">
                    {service.name}
                  </h3>
                </div>
                <Badge 
                  variant={service.status === 'online' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {service.status}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">
                  {service.endpoints.length} endpoints
                </span>
                <Button 
                  size="sm" 
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
      })}
    </div>
  );
};
