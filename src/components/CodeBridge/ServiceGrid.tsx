
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
    <div className={`grid gap-${isCompact ? '3' : '4'} ${
      isCompact ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {services.map((service) => {
        const IconComponent = serviceIcons[service.id as keyof typeof serviceIcons] || Server;
        
        return (
          <Card 
            key={service.id} 
            className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => onServiceClick(service)}
          >
            <div className={isCompact ? 'p-3' : 'p-4'}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <IconComponent className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'} text-blue-400`} />
                  <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-base'}`}>
                    {service.name}
                  </h3>
                </div>
                <Badge 
                  variant={service.status === 'online' ? 'default' : 'destructive'}
                  className={isCompact ? 'text-xs' : ''}
                >
                  {service.status}
                </Badge>
              </div>
              
              <p className={`text-gray-400 mb-3 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                {service.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  {service.endpoints.length} endpoints
                </span>
                <Button 
                  size={isCompact ? 'sm' : 'default'} 
                  variant="outline"
                  className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
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
