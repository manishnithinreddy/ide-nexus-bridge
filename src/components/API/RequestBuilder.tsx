
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, 
  Save, 
  Copy, 
  Download,
  Upload,
  Settings,
  Plus,
  Trash2,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const RequestBuilder = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [params, setParams] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [collections] = useState([
    {
      id: 1,
      name: 'Authentication API',
      requests: 12,
      lastRun: '2 hours ago',
      status: 'passed'
    },
    {
      id: 2,
      name: 'User Management',
      requests: 8,
      lastRun: '1 day ago',
      status: 'failed'
    },
    {
      id: 3,
      name: 'Product API',
      requests: 15,
      lastRun: '3 hours ago',
      status: 'passed'
    }
  ]);

  const [history] = useState([
    {
      id: 1,
      method: 'POST',
      url: 'https://api.example.com/auth/login',
      status: 200,
      duration: '245ms',
      timestamp: '14:30:25'
    },
    {
      id: 2,
      method: 'GET',
      url: 'https://api.example.com/users',
      status: 200,
      duration: '120ms',
      timestamp: '14:28:10'
    },
    {
      id: 3,
      method: 'PUT',
      url: 'https://api.example.com/users/123',
      status: 404,
      duration: '89ms',
      timestamp: '14:25:45'
    }
  ]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, field: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const addParam = () => {
    setParams([...params, { key: '', value: '' }]);
  };

  const updateParam = (index: number, field: string, value: string) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    setParams(newParams);
  };

  const removeParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const handleSendRequest = async () => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setResponse({
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'x-response-time': '124ms'
        },
        data: {
          message: 'Request successful',
          timestamp: new Date().toISOString(),
          data: {
            id: 123,
            name: 'Example Response',
            status: 'active'
          }
        }
      });
      setLoading(false);
    }, 1000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500 hover:bg-green-600';
      case 'POST': return 'bg-blue-500 hover:bg-blue-600';
      case 'PUT': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'DELETE': return 'bg-red-500 hover:bg-red-600';
      case 'PATCH': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    if (status >= 500) return 'text-red-400';
    return 'text-gray-400';
  };

  const getCollectionStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-400 bg-green-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">API Testing</h1>
          <p className="text-gray-400">Test REST APIs with powerful request builder</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-green-500 hover:bg-green-600">
            <Plus className="h-4 w-4 mr-2" />
            New Collection
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Collections Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Collections</h3>
            <div className="space-y-3">
              {collections.map((collection) => (
                <div key={collection.id} className="bg-gray-900 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{collection.name}</h4>
                    <Badge className={getCollectionStatusColor(collection.status)}>
                      {collection.status === 'passed' ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400">
                    <p>{collection.requests} requests</p>
                    <p>Last run: {collection.lastRun}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Requests</h3>
            <div className="space-y-2">
              {history.slice(0, 5).map((request) => (
                <div key={request.id} className="bg-gray-900 rounded p-2 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <Badge className={getMethodColor(request.method)}>
                      {request.method}
                    </Badge>
                    <span className={getStatusColor(request.status)}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-gray-400 truncate">{request.url}</p>
                  <div className="flex justify-between text-gray-500 mt-1">
                    <span>{request.duration}</span>
                    <span>{request.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Request Builder */}
        <div className="xl:col-span-3 space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Request Builder</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-gray-600">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Method and URL */}
              <div className="flex space-x-2">
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="w-32 bg-gray-900 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Enter request URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 bg-gray-900 border-gray-600 text-white"
                />
                <Button 
                  className={`${getMethodColor(method)} px-6`}
                  onClick={handleSendRequest}
                  disabled={loading || !url}
                >
                  {loading ? (
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  Send
                </Button>
              </div>

              <Tabs defaultValue="params" className="mt-6">
                <TabsList className="bg-gray-900">
                  <TabsTrigger value="params">Params</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="body">Body</TabsTrigger>
                  <TabsTrigger value="auth">Auth</TabsTrigger>
                </TabsList>

                <TabsContent value="params" className="space-y-2 mt-4">
                  {params.map((param, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        placeholder="Key"
                        value={param.key}
                        onChange={(e) => updateParam(index, 'key', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="Value"
                        value={param.value}
                        onChange={(e) => updateParam(index, 'value', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                        onClick={() => removeParam(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="border-gray-600" onClick={addParam}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Parameter
                  </Button>
                </TabsContent>

                <TabsContent value="headers" className="space-y-2 mt-4">
                  {headers.map((header, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        placeholder="Header Name"
                        value={header.key}
                        onChange={(e) => updateHeader(index, 'key', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="Header Value"
                        value={header.value}
                        onChange={(e) => updateHeader(index, 'value', e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                        onClick={() => removeHeader(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="border-gray-600" onClick={addHeader}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Header
                  </Button>
                </TabsContent>

                <TabsContent value="body" className="mt-4">
                  <Textarea
                    placeholder="Request body (JSON, XML, etc.)"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="bg-gray-900 border-gray-600 text-white font-mono min-h-[200px]"
                  />
                </TabsContent>

                <TabsContent value="auth" className="mt-4">
                  <div className="space-y-4">
                    <Select>
                      <SelectTrigger className="bg-gray-900 border-gray-600">
                        <SelectValue placeholder="Select auth type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="none">No Auth</SelectItem>
                        <SelectItem value="bearer">Bearer Token</SelectItem>
                        <SelectItem value="basic">Basic Auth</SelectItem>
                        <SelectItem value="api-key">API Key</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>

          {/* Response Section */}
          {response && (
            <Card className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Response</h3>
                <div className="flex items-center space-x-4">
                  <span className={`font-mono ${getStatusColor(response.status)}`}>
                    {response.status} {response.statusText}
                  </span>
                  <Button size="sm" variant="outline" className="border-gray-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="response-body">
                <TabsList className="bg-gray-900">
                  <TabsTrigger value="response-body">Body</TabsTrigger>
                  <TabsTrigger value="response-headers">Headers</TabsTrigger>
                </TabsList>

                <TabsContent value="response-body" className="mt-4">
                  <pre className="bg-gray-900 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
                    <code>{JSON.stringify(response.data, null, 2)}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="response-headers" className="mt-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    {Object.entries(response.headers).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1 border-b border-gray-700 last:border-b-0">
                        <span className="text-blue-400">{key}:</span>
                        <span className="text-white">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
