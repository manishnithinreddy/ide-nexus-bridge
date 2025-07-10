
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Container, 
  Play, 
  Square, 
  RotateCcw, 
  Trash2,
  Download,
  Upload,
  Image as ImageIcon,
  Activity
} from 'lucide-react';

interface DockerProps {
  containerSize?: string;
}

export const Docker: React.FC<DockerProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';

  const containers = [
    { id: 'web-app-1', name: 'web-app', status: 'running', image: 'nginx:latest', ports: '80:3000', uptime: '2h 15m' },
    { id: 'api-1', name: 'api-service', status: 'running', image: 'node:18', ports: '3001:3001', uptime: '1h 30m' },
    { id: 'db-1', name: 'postgres-db', status: 'stopped', image: 'postgres:14', ports: '5432:5432', uptime: 'N/A' },
    { id: 'redis-1', name: 'redis-cache', status: 'running', image: 'redis:alpine', ports: '6379:6379', uptime: '3h 45m' },
  ];

  const images = [
    { id: 'nginx:latest', name: 'nginx', tag: 'latest', size: '142MB', created: '2 days ago' },
    { id: 'node:18', name: 'node', tag: '18', size: '996MB', created: '1 week ago' },
    { id: 'postgres:14', name: 'postgres', tag: '14', size: '374MB', created: '3 days ago' },
    { id: 'redis:alpine', name: 'redis', tag: 'alpine', size: '32MB', created: '1 day ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`space-y-${isCompact ? '3' : '6'} ${isCompact ? 'p-3' : 'p-6'}`}>
      <div>
        <h1 className={`font-bold text-white mb-2 flex items-center gap-3 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
          <Container className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8'} text-cyan-400`} />
          Docker Management
        </h1>
        <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
          {isCompact ? 'Manage containers & images' : 'Manage your Docker containers, images, and deployments'}
        </p>
      </div>

      <Tabs defaultValue="containers" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="containers" className={isCompact ? 'text-xs px-2' : ''}>Containers</TabsTrigger>
          <TabsTrigger value="images" className={isCompact ? 'text-xs px-2' : ''}>Images</TabsTrigger>
          <TabsTrigger value="networks" className={isCompact ? 'text-xs px-2' : ''}>Networks</TabsTrigger>
        </TabsList>

        <TabsContent value="containers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className={`font-semibold text-white ${isCompact ? 'text-lg' : 'text-xl'}`}>Running Containers</h2>
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
              <Play className="h-4 w-4 mr-1" />
              {isCompact ? 'New' : 'New Container'}
            </Button>
          </div>

          <div className="space-y-3">
            {containers.map((container) => (
              <Card key={container.id} className="bg-gray-800 border-gray-700">
                <div className={isCompact ? 'p-3' : 'p-4'}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(container.status)}`}></div>
                      <div>
                        <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                          {container.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{container.image}</p>
                      </div>
                    </div>
                    <Badge variant={container.status === 'running' ? 'default' : 'secondary'}>
                      {container.status}
                    </Badge>
                  </div>

                  <div className={`grid grid-cols-2 gap-4 mb-3 text-sm ${isCompact ? 'text-xs' : ''}`}>
                    <div>
                      <span className="text-gray-500">Ports:</span>
                      <span className="text-white ml-2">{container.ports}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Uptime:</span>
                      <span className="text-white ml-2">{container.uptime}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {container.status === 'running' ? (
                      <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                        <Square className="h-4 w-4 mr-1" />
                        Stop
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      {isCompact ? 'Restart' : 'Restart'}
                    </Button>
                    <Button size="sm" variant="outline" className="bg-red-700 border-red-600 text-red-300">
                      <Trash2 className="h-4 w-4 mr-1" />
                      {isCompact ? 'Del' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className={`font-semibold text-white ${isCompact ? 'text-lg' : 'text-xl'}`}>Docker Images</h2>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                <Download className="h-4 w-4 mr-1" />
                Pull
              </Button>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                <Upload className="h-4 w-4 mr-1" />
                Build
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {images.map((image) => (
              <Card key={image.id} className="bg-gray-800 border-gray-700">
                <div className={isCompact ? 'p-3' : 'p-4'}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ImageIcon className="h-6 w-6 text-cyan-400" />
                      <div>
                        <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                          {image.name}:{image.tag}
                        </h3>
                        <div className="flex space-x-4 text-sm text-gray-400">
                          <span>Size: {image.size}</span>
                          <span>Created: {image.created}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                      <Play className="h-4 w-4 mr-1" />
                      Run
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="networks" className="space-y-4">
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Network Management</h3>
            <p className="text-gray-400">Docker network configuration and management tools</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
