
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Copy, Download, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeGeneratorProps {
  containerSize?: string;
}

export const CodeGenerator: React.FC<CodeGeneratorProps> = ({ containerSize }) => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isCompact = containerSize === 'compact';

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const sampleCode = `// Generated ${language} code
function example() {
  console.log("This is generated code based on: ${prompt}");
  return "Hello World!";
}

example();`;
      setGeneratedCode(sampleCode);
      setLoading(false);
      toast({ title: 'Code Generated', description: 'Your code has been generated successfully!' });
    }, 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({ title: 'Copied', description: 'Code copied to clipboard!' });
  };

  return (
    <div className={`grid gap-${isCompact ? '3' : '6'} ${isCompact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
      {/* Input Section */}
      <Card className="bg-gray-800 border-gray-700">
        <div className={isCompact ? 'p-3' : 'p-6'}>
          <h3 className={`font-semibold text-white mb-4 ${isCompact ? 'text-sm' : 'text-lg'}`}>
            Describe Your Code
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className={`text-gray-300 block mb-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
                Programming Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className={`text-gray-300 block mb-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
                Code Description
              </label>
              <Textarea
                placeholder="Describe what you want the code to do..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`bg-gray-700 border-gray-600 text-white resize-none ${
                  isCompact ? 'h-20' : 'h-32'
                }`}
              />
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
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

      {/* Output Section */}
      <Card className="bg-gray-800 border-gray-700">
        <div className={isCompact ? 'p-3' : 'p-6'}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
              Generated Code
            </h3>
            {generatedCode && (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyCode}
                  className="bg-gray-700 border-gray-600 text-gray-300"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-gray-700 border-gray-600 text-gray-300"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Save
                </Button>
              </div>
            )}
          </div>

          {generatedCode ? (
            <div className="relative">
              <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
                {language}
              </Badge>
              <pre className={`bg-gray-900 rounded p-4 overflow-x-auto text-green-400 ${
                isCompact ? 'text-xs max-h-40' : 'text-sm max-h-80'
              }`}>
                <code>{generatedCode}</code>
              </pre>
            </div>
          ) : (
            <div className={`bg-gray-900 rounded p-4 text-center text-gray-500 ${
              isCompact ? 'py-8' : 'py-16'
            }`}>
              <Wand2 className={`h-${isCompact ? '8' : '12'} w-${isCompact ? '8' : '12'} mx-auto mb-4 text-gray-600`} />
              <p className={isCompact ? 'text-sm' : 'text-base'}>
                {isCompact ? 'Enter prompt to generate code' : 'Enter a description above to generate code'}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
