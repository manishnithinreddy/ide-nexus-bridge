
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Container, 
  Play, 
  Square, 
  Trash2, 
  Download, 
  Upload,
  Terminal,
  Settings,
  Plus,
  Search,
  Activity
} from 'lucide-react';

export const Docker = () => {
  const [containers, setContainers] = useState([
    {
      id: 'cont_001',
      name: 'codebridge-api',
      image: 'node:18-alpine',
      status: 'running',
      port: '3000:3000',
      created: '2 hours ago',
      cpu: '12%',
      memory: '256MB'
    },
    {
      id: 'cont_002',
      name: 'postgres-db',
      image: 'postgres:15',
      status: 'running',
      port: '5432:5432',
      created: '1 day ago',
      cpu: '3%',
      memory: '128MB'
    },
    {
      id: 'cont_003',
      name: 'redis-cache',
      image: 'redis:7-alpine',
      status: 'stopped',
      port: '6379:6379',
      created: '3 days ago',
      cpu: '0%',
      memory: '0MB'
    }
  ]);

  const [images, setImages] = useState([
    {
      id: 'img_001',
      repository: 'node',
      tag: '18-alpine',
      imageId: 'a1b2c3d4e5f6',
      created: '2 weeks ago',
      size: '165MB'
    },
    {
      id: 'img_002',
      repository: 'postgres',
      tag: '15',
      imageId: 'f6e5d4c3b2a1',
      created: '1 month ago',
      size: '374MB'
    },
    {
      id: 'img_003',
      repository: 'redis',
      tag: '7-alpine',
      imageId: '123456789abc',
      created: '3 weeks ago',
      size: '32MB'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-400/10';
      case 'stopped': return 'text-red-400 bg-red-400/10';
      case 'paused': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleContainerAction = (id: string, action: string) => {
    setContainers(containers.map(container => {
      if (container.id === id) {
        switch (action) {
          case 'start':
            return { ...container, status: 'running' };
          case 'stop':
            return { ...container, status: 'stopped' };
          default:
            return container;
        }
      }
      return container;
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Docker Management</h1>
          <p className="text-gray-400">Manage containers, images, and Docker resources</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-cyan-500 hover:bg-cyan-600">
            <Plus className="h-4 w-4 mr-2" />
            New Container
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="containers" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="containers">Containers</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="networks">Networks</TabsTrigger>
          <TabsTrigger value="volumes">Volumes</TabsTrigger>
        </TabsList>

        <TabsContent value="containers" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search containers..." 
                className="pl-10 bg-gray-800 border-gray-600"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {containers.map((container) => (
              <Card key={container.id} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Container className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-lg font-semibold text-white">{container.name}</h3>
                      <Badge className={getStatusColor(container.status)}>
                        {container.status}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-4">{container.image}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Port:</span>
                        <p className="text-white">{container.port}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">CPU:</span>
                        <p className="text-white">{container.cpu}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Memory:</span>
                        <p className="text-white">{container.memory}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Created:</span>
                        <p className="text-white">{container.created}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {container.status === 'running' ? (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                        onClick={() => handleContainerAction(container.id, 'stop')}
                      >
                        <Square className="h-4 w-4 mr-2" />
                        Stop
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleContainerAction(container.id, 'start')}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <Terminal className="h-4 w-4 mr-2" />
                      Shell
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search images..." 
                className="pl-10 bg-gray-800 border-gray-600"
              />
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Download className="h-4 w-4 mr-2" />
              Pull Image
            </Button>
          </div>

          <div className="grid gap-4">
            {images.map((image) => (
              <Card key={image.id} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <Container className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {image.repository}:{image.tag}
                      </h3>
                      <p className="text-gray-400 text-sm">ID: {image.imageId}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <span>Size: {image.size}</span>
                        <span>Created: {image.created}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                      <Play className="h-4 w-4 mr-2" />
                      Run
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <Upload className="h-4 w-4 mr-2" />
                      Push
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="networks" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Docker Networks</h3>
              <p className="text-gray-400">Network management features coming soon...</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="volumes" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="text-center py-8">
              <Container className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Docker Volumes</h3>
              <p className="text-gray-400">Volume management features coming soon...</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
