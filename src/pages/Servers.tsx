
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  Monitor, 
  Terminal, 
  Key, 
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  AlertTriangle
} from 'lucide-react';

interface ServersProps {
  containerSize?: string;
}

export const Servers: React.FC<ServersProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';

  const servers = [
    { 
      id: 'prod-web-01', 
      name: 'Production Web Server', 
      status: 'online', 
      ip: '192.168.1.100', 
      cpu: '45%', 
      memory: '68%', 
      disk: '34%',
      uptime: '15d 4h 23m'
    },
    { 
      id: 'staging-api-01', 
      name: 'Staging API Server', 
      status: 'online', 
      ip: '192.168.1.101', 
      cpu: '23%', 
      memory: '41%', 
      disk: '67%',
      uptime: '7d 12h 45m'
    },
    { 
      id: 'dev-db-01', 
      name: 'Development Database', 
      status: 'warning', 
      ip: '192.168.1.102', 
      cpu: '78%', 
      memory: '89%', 
      disk: '45%',
      uptime: '3d 8h 12m'
    },
    { 
      id: 'backup-01', 
      name: 'Backup Server', 
      status: 'offline', 
      ip: '192.168.1.103', 
      cpu: 'N/A', 
      memory: 'N/A', 
      disk: 'N/A',
      uptime: 'N/A'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Monitor className="h-4 w-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'offline': return <Server className="h-4 w-4 text-red-400" />;
      default: return <Server className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className={`space-y-${isCompact ? '3' : '6'} ${isCompact ? 'p-3' : 'p-6'}`}>
      <div>
        <h1 className={`font-bold text-white mb-2 flex items-center gap-3 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
          <Server className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8'} text-purple-400`} />
          Server Management
        </h1>
        <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
          {isCompact ? 'Monitor & manage servers' : 'Monitor server health, manage SSH connections, and track performance'}
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="overview" className={isCompact ? 'text-xs px-2' : ''}>Overview</TabsTrigger>
          <TabsTrigger value="monitoring" className={isCompact ? 'text-xs px-2' : ''}>Monitoring</TabsTrigger>
          <TabsTrigger value="ssh" className={isCompact ? 'text-xs px-2' : ''}>SSH Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className={`grid gap-${isCompact ? '3' : '4'} ${isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {servers.map((server) => (
              <Card key={server.id} className="bg-gray-800 border-gray-700">
                <div className={isCompact ? 'p-3' : 'p-4'}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(server.status)}
                      <div>
                        <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                          {server.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{server.ip}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(server.status)}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(server.status)}`} />
                      {server.status}
                    </Badge>
                  </div>

                  {server.status !== 'offline' && (
                    <div className={`grid grid-cols-3 gap-3 mb-3 text-sm ${isCompact ? 'text-xs' : ''}`}>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Cpu className="h-4 w-4 text-blue-400 mr-1" />
                        </div>
                        <div className="font-semibold text-white">{server.cpu}</div>
                        <div className="text-gray-500">CPU</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Activity className="h-4 w-4 text-green-400 mr-1" />
                        </div>
                        <div className="font-semibold text-white">{server.memory}</div>
                        <div className="text-gray-500">Memory</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <HardDrive className="h-4 w-4 text-yellow-400 mr-1" />
                        </div>
                        <div className="font-semibold text-white">{server.disk}</div>
                        <div className="text-gray-500">Disk</div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 text-sm">Uptime: {server.uptime}</span>
                  </div>

                  <div className="flex space-x-2">
                    {server.status === 'online' ? (
                      <>
                        <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                          <Terminal className="h-4 w-4 mr-1" />
                          SSH
                        </Button>
                        <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                          <Monitor className="h-4 w-4 mr-1" />
                          Logs
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                        <Wifi className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Monitoring</h3>
            <p className="text-gray-400">Server performance metrics and health monitoring dashboard</p>
          </div>
        </TabsContent>

        <TabsContent value="ssh" className="space-y-4">
          <div className="text-center py-12">
            <Key className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">SSH Key Management</h3>
            <p className="text-gray-400">Manage SSH keys for secure server access</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
