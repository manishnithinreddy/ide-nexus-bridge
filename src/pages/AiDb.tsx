
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Brain, 
  Search, 
  FileText, 
  Zap,
  Activity,
  BarChart3,
  MessageSquare
} from 'lucide-react';

interface AiDbProps {
  containerSize?: string;
}

export const AiDb: React.FC<AiDbProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';

  const databases = [
    { name: 'users_db', type: 'PostgreSQL', status: 'online', connections: 23, size: '2.3GB' },
    { name: 'analytics_db', type: 'MongoDB', status: 'online', connections: 15, size: '1.8GB' },
    { name: 'cache_db', type: 'Redis', status: 'online', connections: 45, size: '512MB' },
    { name: 'logs_db', type: 'ClickHouse', status: 'warning', connections: 8, size: '5.2GB' },
  ];

  const aiServices = [
    { name: 'Query Assistant', status: 'active', model: 'GPT-4', requests: '1.2k/day' },
    { name: 'Schema Analyzer', status: 'active', model: 'Claude-3', requests: '340/day' },
    { name: 'Data Insights', status: 'inactive', model: 'GPT-3.5', requests: '0/day' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'active': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'offline':
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`space-y-${isCompact ? '3' : '6'} ${isCompact ? 'p-3' : 'p-6'}`}>
      <div>
        <h1 className={`font-bold text-white mb-2 flex items-center gap-3 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
          <Database className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8'} text-pink-400`} />
          AI-DB Management
        </h1>
        <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
          {isCompact ? 'AI-powered database tools' : 'AI-powered database management and intelligent query assistance'}
        </p>
      </div>

      <Tabs defaultValue="databases" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="databases" className={isCompact ? 'text-xs px-2' : ''}>Databases</TabsTrigger>
          <TabsTrigger value="ai-services" className={isCompact ? 'text-xs px-2' : ''}>
            {isCompact ? 'AI' : 'AI Services'}
          </TabsTrigger>
          <TabsTrigger value="query-builder" className={isCompact ? 'text-xs px-2' : ''}>
            {isCompact ? 'Query' : 'Query Builder'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="databases" className="space-y-4">
          <div className={`grid gap-${isCompact ? '3' : '4'} ${isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {databases.map((db, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <div className={isCompact ? 'p-3' : 'p-4'}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Database className="h-6 w-6 text-pink-400" />
                      <div>
                        <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                          {db.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{db.type}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(db.status)}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(db.status)}`} />
                      {db.status}
                    </Badge>
                  </div>

                  <div className={`grid grid-cols-2 gap-3 mb-3 text-sm ${isCompact ? 'text-xs' : ''}`}>
                    <div>
                      <span className="text-gray-500">Connections:</span>
                      <span className="text-white ml-2 font-semibold">{db.connections}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="text-white ml-2 font-semibold">{db.size}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                      <Search className="h-4 w-4 mr-1" />
                      Query
                    </Button>
                    <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Stats
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-services" className="space-y-4">
          <div className="space-y-3">
            {aiServices.map((service, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <div className={isCompact ? 'p-3' : 'p-4'}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Brain className="h-6 w-6 text-purple-400" />
                      <div>
                        <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                          {service.name}
                        </h3>
                        <div className="flex space-x-4 text-sm text-gray-400">
                          <span>Model: {service.model}</span>
                          <span>Requests: {service.requests}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="query-builder" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <div className={isCompact ? 'p-3' : 'p-6'}>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">AI Query Builder</h3>
                <p className="text-gray-400 mb-4">
                  {isCompact 
                    ? 'Natural language to SQL queries' 
                    : 'Convert natural language descriptions into optimized SQL queries using AI'
                  }
                </p>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Start Building Queries
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
