
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Wand2, Loader2 } from 'lucide-react';
import { apiService } from '@/services/api';
import { CodeGenerationRequest, CodeGenerationResponse } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

const languages = [
  'javascript', 'typescript', 'python', 'java', 'csharp', 'cpp', 'go', 'rust', 'php', 'ruby'
];

const frameworks = [
  'react', 'vue', 'angular', 'express', 'fastapi', 'spring', 'django', 'flask', 'nextjs'
];

export const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('');
  const [framework, setFramework] = useState('');
  const [context, setContext] = useState('');
  const [response, setResponse] = useState<CodeGenerationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: 'Error', description: 'Please enter a prompt', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const request: CodeGenerationRequest = {
        prompt: prompt.trim(),
        language: language || undefined,
        framework: framework || undefined,
        context: context || undefined,
      };

      const result = await apiService.generateCode(request);
      setResponse(result);
      toast({ title: 'Success', description: 'Code generated successfully!' });
    } catch (error) {
      console.error('Code generation error:', error);
      toast({ 
        title: 'Error', 
        description: error instanceof Error ? error.message : 'Failed to generate code',
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied', description: 'Code copied to clipboard!' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full p-6">
      {/* Input Panel */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Code Generation</h3>
            <Badge variant="outline" className="border-green-500 text-green-400">
              AI Powered
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What do you want to build?
              </label>
              <Textarea
                placeholder="Describe the code you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Framework
                </label>
                <Select value={framework} onValueChange={setFramework}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.map((fw) => (
                      <SelectItem key={fw} value={fw}>
                        {fw.charAt(0).toUpperCase() + fw.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Additional Context (Optional)
              </label>
              <Textarea
                placeholder="Any additional context or requirements..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white h-20"
              />
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Code
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Output Panel */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Generated Code</h3>
            {response && (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(response.code)}
                  className="bg-gray-700 border-gray-600"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-gray-700 border-gray-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </div>

          {response ? (
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="bg-gray-700">
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="explanation">Explanation</TabsTrigger>
                {response.suggestions && (
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="code" className="mt-4">
                <pre className="bg-gray-900 p-4 rounded-lg text-sm text-green-400 overflow-auto h-80">
                  <code>{response.code}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="explanation" className="mt-4">
                <div className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300 h-80 overflow-auto">
                  {response.explanation || 'No explanation provided.'}
                </div>
              </TabsContent>
              
              {response.suggestions && (
                <TabsContent value="suggestions" className="mt-4">
                  <div className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300 h-80 overflow-auto">
                    <ul className="list-disc list-inside space-y-2">
                      {response.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-80 text-gray-400">
              <div className="text-center">
                <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Generate code to see the results</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
