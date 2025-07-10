
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wand2, Copy, Download, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { codeBridgeApi } from '@/services/codeBridgeApi';

interface AICodeGeneratorProps {
  containerSize?: string;
}

export const AICodeGenerator: React.FC<AICodeGeneratorProps> = ({ containerSize }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isCompact = containerSize === 'compact';

  const { data: models = [] } = useQuery({
    queryKey: ['ai-models'],
    queryFn: () => codeBridgeApi.getAIModels(),
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const result = await codeBridgeApi.generateCode(prompt, selectedModel);
      setGeneratedCode(result.code);
      setExplanation(result.explanation);
      toast({ title: 'Code Generated', description: 'AI has generated your code successfully!' });
    } catch (error) {
      toast({ 
        title: 'Generation Failed', 
        description: error instanceof Error ? error.message : 'Failed to generate code',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
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
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'} text-purple-400`} />
            <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
              AI Code Generator
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`text-gray-300 block mb-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
                AI Model
              </label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
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
              <label className={`text-gray-300 block mb-2 ${isCompact ? 'text-sm' : 'text-base'}`}>
                Code Description
              </label>
              <Textarea
                placeholder="Describe what you want the AI to generate..."
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
              className="w-full bg-purple-600 hover:bg-purple-700"
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
            <div className="space-y-4">
              <div className="relative">
                <pre className={`bg-gray-900 rounded p-4 overflow-x-auto text-green-400 ${
                  isCompact ? 'text-xs max-h-40' : 'text-sm max-h-80'
                }`}>
                  <code>{generatedCode}</code>
                </pre>
              </div>
              
              {explanation && (
                <div className="bg-gray-900 rounded p-4">
                  <h4 className={`text-white font-medium mb-2 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    AI Explanation:
                  </h4>
                  <p className={`text-gray-300 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    {explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className={`bg-gray-900 rounded p-4 text-center text-gray-500 ${
              isCompact ? 'py-8' : 'py-16'
            }`}>
              <Sparkles className={`h-${isCompact ? '8' : '12'} w-${isCompact ? '8' : '12'} mx-auto mb-4 text-gray-600`} />
              <p className={isCompact ? 'text-sm' : 'text-base'}>
                {isCompact ? 'Enter prompt to generate code' : 'Enter a description above to generate code with AI'}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
