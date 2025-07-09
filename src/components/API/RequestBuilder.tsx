
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Play, Save, Share, History } from 'lucide-react';

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

export const RequestBuilder = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse({
        status: 200,
        statusText: 'OK',
        data: { message: 'Request successful', timestamp: new Date().toISOString() },
        headers: { 'content-type': 'application/json' },
        time: '245ms'
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full p-6">
      {/* Request Builder */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Request Builder</h3>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* URL and Method */}
          <div className="flex space-x-2 mb-4">
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {httpMethods.map((m) => (
                  <SelectItem key={m} value={m} className="text-white">
                    <Badge className={`text-xs ${
                      m === 'GET' ? 'bg-green-500' :
                      m === 'POST' ? 'bg-blue-500' :
                      m === 'PUT' ? 'bg-yellow-500' :
                      m === 'DELETE' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}>
                      {m}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Enter request URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-gray-700 border-gray-600 text-white"
            />
            <Button 
              onClick={handleSendRequest}
              disabled={loading || !url}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Play className="h-4 w-4 mr-2" />
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </div>

          {/* Request Details */}
          <Tabs defaultValue="params" className="w-full">
            <TabsList className="bg-gray-700">
              <TabsTrigger value="params">Params</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
            </TabsList>
            
            <TabsContent value="params" className="mt-4">
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input placeholder="Key" className="bg-gray-700 border-gray-600" />
                  <Input placeholder="Value" className="bg-gray-700 border-gray-600" />
                  <Button size="sm" variant="outline" className="bg-gray-700">+</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="headers" className="mt-4">
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input placeholder="Header" className="bg-gray-700 border-gray-600" />
                  <Input placeholder="Value" className="bg-gray-700 border-gray-600" />
                  <Button size="sm" variant="outline" className="bg-gray-700">+</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="body" className="mt-4">
              <Textarea
                placeholder="Request body (JSON)"
                className="bg-gray-700 border-gray-600 text-white h-32"
              />
            </TabsContent>
            
            <TabsContent value="auth" className="mt-4">
              <Select>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Select auth type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="none">No Auth</SelectItem>
                  <SelectItem value="bearer">Bearer Token</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                  <SelectItem value="api-key">API Key</SelectItem>
                </SelectContent>
              </Select>
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      {/* Response Viewer */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Response</h3>
            {response && (
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500">
                  {response.status} {response.statusText}
                </Badge>
                <Badge variant="outline" className="border-gray-600">
                  {response.time}
                </Badge>
              </div>
            )}
          </div>

          {response ? (
            <Tabs defaultValue="body" className="w-full">
              <TabsList className="bg-gray-700">
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="body" className="mt-4">
                <pre className="bg-gray-900 p-4 rounded-lg text-sm text-green-400 overflow-auto h-64">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </TabsContent>
              
              <TabsContent value="headers" className="mt-4">
                <pre className="bg-gray-900 p-4 rounded-lg text-sm text-green-400 overflow-auto h-64">
                  {JSON.stringify(response.headers, null, 2)}
                </pre>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Send a request to see the response</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
