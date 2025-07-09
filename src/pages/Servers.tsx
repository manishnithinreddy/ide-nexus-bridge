
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Activity, 
  Terminal,
  Settings,
  Plus,
  Search,
  Wifi,
  Shield,
  AlertTriangle
} from 'lucide-react';

export const Servers = () => {
  const [servers, setServers] = useState([
    {
      id: 'srv_001',
      name: 'Production API Server',
      ip: '192.168.1.100',
      status: 'online',
      os: 'Ubuntu 22.04',
      cpu: 45,
      memory: 68,
      disk: 32,
      uptime: '15 days',
      load: '0.8'
    },
    {
      id: 'srv_002',
      name: 'Database Server',
      ip: '192.168.1.101',
      status: 'online',
      os: 'CentOS 8',
      cpu: 23,
      memory: 84,
      disk: 67,
      uptime: '7 days',
      load: '1.2'
    },
    {
      id: 'srv_003',
      name: 'Development Server',
      ip: '192.168.1.102',
      status: 'warning',
      os: 'Ubuntu 20.04',
      cpu: 78,
      memory: 91,
      disk: 45,
      uptime: '3 days',
      load: '2.1'
    },
    {
      id: 'srv_004',
      name: 'Backup Server',
      ip: '192.168.1.103',
      status: 'offline',
      os: 'Debian 11',
      cpu: 0,
      memory: 0,
      disk: 23,
      uptime: '0 days',
      load: '0.0'
    }
  ]);

  const [logs] = useState([
    {
      id: 1,
      server: 'Production API Server',
      level: 'info',
      message: 'Application started successfully',
      timestamp: '2024-01-09 14:30:25'
    },
    {
      id: 2,
      server: 'Database Server',
      level: 'warning',
      message: 'High memory usage detected',
      timestamp: '2024-01-09 14:28:15'
    },
    {
      id: 3,
      server: 'Development Server',
      level: 'error',
      message: 'Failed to connect to external service',
      timestamp: '2024-01-09 14:25:10'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-400/10';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10';
      case 'offline': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Activity className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'offline': return <Server className="h-4 w-4" />;
      default: return <Server className="h-4 w-4" />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage > 80) return 'bg-red-500';
    if (usage > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Server Management</h1>
          <p className="text-gray-400">Monitor and manage your server infrastructure</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-purple-500 hover:bg-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Server
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search servers..." 
                className="pl-10 bg-gray-800 border-gray-600"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {servers.map((server) => (
              <Card key={server.id} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Server className="h-5 w-5 text-purple-400" />
                      <h3 className="text-lg font-semibold text-white">{server.name}</h3>
                      <Badge className={getStatusColor(server.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(server.status)}
                          <span>{server.status}</span>
                        </div>
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-gray-400 text-sm">IP Address:</span>
                        <p className="text-white">{server.ip}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">OS:</span>
                        <p className="text-white">{server.os}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Uptime:</span>
                        <p className="text-white">{server.uptime}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Load Avg:</span>
                        <p className="text-white">{server.load}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-400 text-sm">CPU</span>
                          <span className="text-white text-sm">{server.cpu}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                            style={{ width: `${server.cpu}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-400 text-sm">Memory</span>
                          <span className="text-white text-sm">{server.memory}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                            style={{ width: `${server.memory}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-400 text-sm">Disk</span>
                          <span className="text-white text-sm">{server.disk}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getUsageColor(server.disk)}`}
                            style={{ width: `${server.disk}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <Terminal className="h-4 w-4 mr-2" />
                      SSH
                    </Button>
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                      <Activity className="h-4 w-4 mr-2" />
                      Monitor
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Online Servers</p>
                  <p className="text-2xl font-bold text-white">3/4</p>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Cpu className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Avg CPU Usage</p>
                  <p className="text-2xl font-bold text-white">49%</p>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Avg Memory</p>
                  <p className="text-2xl font-bold text-white">67%</p>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <HardDrive className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Avg Disk Usage</p>
                  <p className="text-2xl font-bold text-white">42%</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Monitoring</h3>
              <p className="text-gray-400">Advanced monitoring charts and metrics coming soon...</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search logs..." 
                className="pl-10 bg-gray-800 border-gray-600"
              />
            </div>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Recent Logs</h3>
            </div>
            <div className="divide-y divide-gray-700">
              {logs.map((log) => (
                <div key={log.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {log.server}
                        </Badge>
                        <Badge className={`${getLogLevelColor(log.level)} bg-transparent border`}>
                          {log.level.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-white">{log.message}</p>
                      <p className="text-gray-400 text-sm mt-1">{log.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Security Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Firewall Status</span>
                  <Badge className="text-green-400 bg-green-400/10">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">SSL Certificates</span>
                  <Badge className="text-green-400 bg-green-400/10">Valid</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">SSH Keys</span>
                  <Badge className="text-yellow-400 bg-yellow-400/10">Expiring Soon</Badge>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Wifi className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Network Security</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">VPN Status</span>
                  <Badge className="text-green-400 bg-green-400/10">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Intrusion Detection</span>
                  <Badge className="text-green-400 bg-green-400/10">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">DDoS Protection</span>
                  <Badge className="text-green-400 bg-green-400/10">Enabled</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
