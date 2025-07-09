
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Bot, 
  Play, 
  Save, 
  Download,
  Upload,
  Settings,
  Plus,
  Search,
  Zap,
  Brain,
  Table
} from 'lucide-react';

export const AiDb = () => {
  const [query, setQuery] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  
  const [databases] = useState([
    {
      id: 'db_001',
      name: 'Production DB',
      type: 'PostgreSQL',
      status: 'connected',
      connections: 23,
      size: '2.4 GB',
      lastQuery: '2 minutes ago'
    },
    {
      id: 'db_002',
      name: 'Analytics DB',
      type: 'MongoDB',
      status: 'connected',
      connections: 8,
      size: '1.8 GB',
      lastQuery: '15 minutes ago'
    },
    {
      id: 'db_003',
      name: 'Cache DB',
      type: 'Redis',
      status: 'disconnected',
      connections: 0,
      size: '256 MB',
      lastQuery: '2 hours ago'
    }
  ]);

  const [queryHistory] = useState([
    {
      id: 1,
      query: 'SELECT * FROM users WHERE created_at > NOW() - INTERVAL 1 DAY',
      database: 'Production DB',
      executedAt: '2024-01-09 14:30:25',
      duration: '120ms',
      rows: 45
    },
    {
      id: 2,
      query: 'UPDATE products SET price = price * 1.1 WHERE category = "electronics"',
      database: 'Production DB',
      executedAt: '2024-01-09 13:45:10',
      duration: '350ms',
      rows: 234
    }
  ]);

  const [aiSuggestions] = useState([
    {
      id: 1,
      prompt: 'Show me all users who signed up in the last week',
      query: 'SELECT * FROM users WHERE created_at >= CURRENT_DATE - INTERVAL 7 DAY',
      confidence: 95
    },
    {
      id: 2,
      prompt: 'Find products with low stock levels',
      query: 'SELECT name, stock_quantity FROM products WHERE stock_quantity < 10',
      confidence: 88
    },
    {
      id: 3,
      prompt: 'Get top selling products this month',
      query: 'SELECT p.name, SUM(oi.quantity) as total_sold FROM products p JOIN order_items oi ON p.id = oi.product_id WHERE oi.created_at >= DATE_TRUNC("month", CURRENT_DATE) GROUP BY p.id ORDER BY total_sold DESC LIMIT 10',
      confidence: 92
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-400/10';
      case 'disconnected': return 'text-red-400 bg-red-400/10';
      case 'connecting': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleExecuteQuery = () => {
    console.log('Executing query:', query);
    // Query execution logic would go here
  };

  const handleAiQuery = () => {
    console.log('AI processing prompt:', aiPrompt);
    // AI query generation logic would go here
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI-DB Services</h1>
          <p className="text-gray-400">Intelligent database management and AI-powered querying</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-pink-500 hover:bg-pink-600">
            <Plus className="h-4 w-4 mr-2" />
            New Connection
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="query-builder" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="query-builder">Query Builder</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="query-builder" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">SQL Query Editor</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={handleExecuteQuery}>
                      <Play className="h-4 w-4 mr-2" />
                      Execute
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder="Enter your SQL query here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white font-mono min-h-[200px]"
                />
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Query Results</h3>
                <div className="bg-gray-900 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <Table className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Execute a query to see results</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="bg-gray-800 border-gray-700 p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Database Connections</h3>
                <div className="space-y-3">
                  {databases.slice(0, 3).map((db) => (
                    <div key={db.id} className="flex items-center justify-between p-2 bg-gray-900 rounded">
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4 text-pink-400" />
                        <span className="text-white text-sm">{db.name}</span>
                      </div>
                      <Badge className={getStatusColor(db.status)}>
                        {db.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full border-gray-600 justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button size="sm" variant="outline" className="w-full border-gray-600 justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                  <Button size="sm" variant="outline" className="w-full border-gray-600 justify-start">
                    <Zap className="h-4 w-4 mr-2" />
                    Optimize Query
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai-assistant" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Bot className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">AI Query Generator</h3>
              </div>
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe what you want to query in natural language..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white min-h-[120px]"
                />
                <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handleAiQuery}>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Query
                </Button>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">AI Suggestions</h3>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-gray-300 text-sm">{suggestion.prompt}</p>
                      <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                        {suggestion.confidence}%
                      </Badge>
                    </div>
                    <code className="text-xs text-blue-400 bg-gray-800 p-2 rounded block">
                      {suggestion.query}
                    </code>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-pink-500 hover:bg-pink-600"
                      onClick={() => setQuery(suggestion.query)}
                    >
                      Use Query
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="databases" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search databases..." 
                className="pl-10 bg-gray-800 border-gray-600"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {databases.map((db) => (
              <Card key={db.id} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Database className="h-5 w-5 text-pink-400" />
                      <h3 className="text-lg font-semibold text-white">{db.name}</h3>
                      <Badge className={getStatusColor(db.status)}>
                        {db.status}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {db.type}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Connections:</span>
                        <p className="text-white">{db.connections}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Size:</span>
                        <p className="text-white">{db.size}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Query:</span>
                        <p className="text-white">{db.lastQuery}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600">
                      Configure
                    </Button>
                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                      Connect
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Query History</h3>
            </div>
            <div className="divide-y divide-gray-700">
              {queryHistory.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <code className="text-sm text-blue-400 bg-gray-900 p-2 rounded block mb-2">
                        {item.query}
                      </code>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Database: {item.database}</span>
                        <span>Duration: {item.duration}</span>
                        <span>Rows: {item.rows}</span>
                        <span>{item.executedAt}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-600 ml-4">
                      Rerun
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
