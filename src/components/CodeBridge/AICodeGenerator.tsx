
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wand2, Copy, Download, Sparkles, Code2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { codeBridgeApi } from '@/services/codeBridgeApi';

interface AICodeGeneratorProps {
  containerSize?: string;
}

export const AICodeGenerator: React.FC<AICodeGeneratorProps> = ({ containerSize }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isCompact = containerSize === 'compact';

  // Mock models for demo
  const models = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
    { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic' },
    { id: 'codellama', name: 'Code Llama', provider: 'Meta' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      // Mock generation for demo
      setTimeout(() => {
        setGeneratedCode(`function helloWorld() {
  console.log("Hello, World!");
  return "Generated with ${selectedModel}";
}`);
        setExplanation("This is a simple Hello World function that demonstrates basic JavaScript syntax and console output.");
        setLoading(false);
        toast({ title: 'Code Generated', description: 'AI has generated your code successfully!' });
      }, 2000);
    } catch (error) {
      toast({ 
        title: 'Generation Failed', 
        description: 'Failed to generate code',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({ title: 'Copied', description: 'Code copied to clipboard!' });
  };

  return (
    <div className={`space-y-4 ${isCompact ? '' : 'max-w-none'}`}>
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Sparkles className={`${isCompact ? 'h-5 w-5' : 'h-6 w-6'} text-primary`} />
        <h2 className={`font-semibold text-foreground ${isCompact ? 'text-base' : 'text-xl'}`}>
          AI Code Generator
        </h2>
      </div>

      <div className={`grid gap-4 ${isCompact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {/* Input Section */}
        <Card className="bg-card border-border">
          <div className={`${isCompact ? 'p-3' : 'p-6'} space-y-4`}>
            <h3 className={`font-medium text-foreground ${isCompact ? 'text-sm' : 'text-base'}`}>
              Configuration
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className={`text-foreground block mb-2 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  AI Model
                </label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex items-center space-x-2">
                          <span>{model.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {model.provider}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className={`text-foreground block mb-2 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  Code Description
                </label>
                <Textarea
                  placeholder="Describe what you want the AI to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className={`bg-background border-border text-foreground resize-none ${
                    isCompact ? 'h-20 text-xs' : 'h-32'
                  }`}
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Output Section */}
        <Card className="bg-card border-border">
          <div className={`${isCompact ? 'p-3' : 'p-6'} space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className={`font-medium text-foreground ${isCompact ? 'text-sm' : 'text-base'}`}>
                Generated Code
              </h3>
              {generatedCode && (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyCode}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
              )}
            </div>

            {generatedCode ? (
              <div className="space-y-3">
                <div className="relative">
                  <pre className={`bg-muted rounded-md p-3 overflow-x-auto text-foreground font-mono ${
                    isCompact ? 'text-xs max-h-32' : 'text-sm max-h-64'
                  }`}>
                    <code>{generatedCode}</code>
                  </pre>
                </div>
                
                {explanation && (
                  <div className="bg-muted/50 rounded-md p-3">
                    <h4 className={`text-foreground font-medium mb-2 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                      Explanation:
                    </h4>
                    <p className={`text-muted-foreground ${isCompact ? 'text-xs' : 'text-sm'}`}>
                      {explanation}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className={`bg-muted/50 rounded-md text-center text-muted-foreground ${
                isCompact ? 'py-8' : 'py-16'
              } space-y-2`}>
                <Code2 className={`h-${isCompact ? '8' : '12'} w-${isCompact ? '8' : '12'} mx-auto text-muted-foreground/50`} />
                <p className={isCompact ? 'text-xs' : 'text-sm'}>
                  {isCompact ? 'Enter prompt above' : 'Enter a description above to generate code with AI'}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
