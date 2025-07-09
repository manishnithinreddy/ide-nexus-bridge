
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wand2, 
  Copy, 
  Download, 
  Save,
  Play,
  RefreshCw,
  Code2,
  FileText,
  Lightbulb
} from 'lucide-react';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [framework, setFramework] = useState('');
  const [context, setContext] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [templates] = useState([
    {
      id: 1,
      title: 'REST API Endpoint',
      description: 'Generate a REST API endpoint with CRUD operations',
      prompt: 'Create a REST API endpoint for managing users with GET, POST, PUT, DELETE operations using Express.js',
      language: 'javascript',
      framework: 'express'
    },
    {
      id: 2,
      title: 'React Component',
      description: 'Generate a React functional component with hooks',
      prompt: 'Create a React component for a user profile form with validation using React hooks',
      language: 'javascript',
      framework: 'react'
    },
    {
      id: 3,
      title: 'Database Model',
      description: 'Generate a database model with relationships',
      prompt: 'Create a Sequelize model for a blog post with title, content, author, and timestamps',
      language: 'javascript',
      framework: 'sequelize'
    },
    {
      id: 4,
      title: 'Authentication Middleware',
      description: 'Generate JWT authentication middleware',
      prompt: 'Create JWT authentication middleware that verifies tokens and protects routes',
      language: 'javascript',
      framework: 'express'
    }
  ]);

  const [history] = useState([
    {
      id: 1,
      prompt: 'Create a React hook for API calls',
      language: 'typescript',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      prompt: 'Generate Express middleware for rate limiting',
      language: 'javascript',
      timestamp: '1 day ago',
      status: 'success'
    },
    {
      id: 3,
      prompt: 'Create Python function for data processing',
      language: 'python',
      timestamp: '2 days ago',
      status: 'success'
    }
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a prompt',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await apiService.generateCode({
        prompt,
        language,
        framework: framework || undefined,
        context: context || undefined,
      });

      setGeneratedCode(response.code);
      setExplanation(response.explanation || '');
      setSuggestions(response.suggestions || []);
      
      toast({
        title: 'Success',
        description: 'Code generated successfully!',
      });
    } catch (error) {
      console.error('Failed to generate code:', error);
      
      // Fallback demo response for testing
      const demoCode = `// Generated ${language} code
${language === 'javascript' ? `
function ${prompt.includes('function') ? 'exampleFunction' : 'generatedFunction'}() {
  // TODO: Implement your logic here
  console.log('This is generated code based on: ${prompt}');
  
  return {
    success: true,
    message: 'Code generated successfully'
  };
}

module.exports = ${prompt.includes('function') ? 'exampleFunction' : 'generatedFunction'};
` : language === 'python' ? `
def ${prompt.includes('function') ? 'example_function' : 'generated_function'}():
    """
    Generated function based on: ${prompt}
    """
    # TODO: Implement your logic here
    print("This is generated Python code")
    
    return {
        "success": True,
        "message": "Code generated successfully"
    }
` : `
// Generated code for ${language}
// Based on prompt: ${prompt}
console.log('Generated code');
`}`;

      setGeneratedCode(demoCode);
      setExplanation(`This code was generated based on your prompt: "${prompt}". The implementation includes basic structure and placeholder logic that you can customize according to your specific requirements.`);
      setSuggestions([
        'Add error handling',
        'Include input validation',
        'Add unit tests',
        'Optimize performance'
      ]);
      
      toast({
        title: 'Demo Mode',
        description: 'Using demo code generation (backend not connected)',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({ title: 'Copied', description: 'Code copied to clipboard!' });
  };

  const downloadCode = () => {
    const extension = language === 'python' ? 'py' : language === 'java' ? 'java' : 'js';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const useTemplate = (template: typeof templates[0]) => {
    setPrompt(template.prompt);
    setLanguage(template.language);
    setFramework(template.framework);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
      {/* Left Sidebar */}
      <div className="xl:col-span-1 space-y-4">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Templates</h3>
          <div className="space-y-3">
            {templates.map((template) => (
              <div key={template.id} className="bg-gray-900 rounded-lg p-3">
                <h4 className="text-white font-medium text-sm mb-1">{template.title}</h4>
                <p className="text-gray-400 text-xs mb-2">{template.description}</p>
                <Button 
                  size="sm" 
                  className="w-full bg-purple-500 hover:bg-purple-600"
                  onClick={() => useTemplate(template)}
                >
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Generations</h3>
          <div className="space-y-2">
            {history.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded p-2 text-xs">
                <p className="text-gray-300 mb-1 line-clamp-2">{item.prompt}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    {item.language}
                  </Badge>
                  <span className="text-gray-500">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="xl:col-span-3 space-y-4">
        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Wand2 className="h-6 w-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">AI Code Generator</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">
                Describe what you want to build
              </label>
              <Textarea
                placeholder="e.g., Create a REST API endpoint for user authentication with JWT tokens..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-gray-900 border-gray-600 text-white min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-gray-900 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Framework (Optional)
                </label>
                <Input
                  placeholder="e.g., React, Express, Django"
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">
                  Context (Optional)
                </label>
                <Input
                  placeholder="e.g., E-commerce app"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="bg-gray-900 border-gray-600 text-white"
                />
              </div>
            </div>

            <Button 
              className="w-full bg-purple-500 hover:bg-purple-600"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4 mr-2" />
              )}
              Generate Code
            </Button>
          </div>
        </Card>

        {generatedCode && (
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Generated Code</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-gray-600" onClick={copyCode}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600" onClick={downloadCode}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            <Tabs defaultValue="code">
              <TabsList className="bg-gray-900">
                <TabsTrigger value="code">
                  <Code2 className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="explanation">
                  <FileText className="h-4 w-4 mr-2" />
                  Explanation
                </TabsTrigger>
                <TabsTrigger value="suggestions">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Suggestions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="mt-4">
                <pre className="bg-gray-900 rounded-lg p-4 text-sm text-green-400 overflow-x-auto max-h-96">
                  <code>{generatedCode}</code>
                </pre>
              </TabsContent>

              <TabsContent value="explanation" className="mt-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">{explanation}</p>
                </div>
              </TabsContent>

              <TabsContent value="suggestions" className="mt-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                        <span className="text-gray-300">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
};
