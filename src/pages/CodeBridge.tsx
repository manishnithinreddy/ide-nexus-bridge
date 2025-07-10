
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeGenerator } from '@/components/CodeGeneration/CodeGenerator';
import { CodeBridgeChat } from '@/components/Chat/CodeBridgeChat';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, MessageSquare, FileCode, Bot, Zap, Code2, Maximize2, Minimize2 } from 'lucide-react';

interface CodeBridgeProps {
  containerSize?: string;
}

export const CodeBridge: React.FC<CodeBridgeProps> = ({ containerSize }) => {
  const [projectId] = useState('default-project');
  const [expandedView, setExpandedView] = useState(false);
  const isCompact = containerSize === 'compact';
  const isMedium = containerSize === 'medium';
  
  const features = [
    {
      icon: Wand2,
      title: 'AI Code Generation',
      description: isCompact ? 'Generate code with AI' : 'Generate code from natural language descriptions',
      color: 'text-blue-400'
    },
    {
      icon: MessageSquare,
      title: 'Interactive Chat',
      description: isCompact ? 'Chat with AI assistant' : 'Chat with AI about your code and get instant help',
      color: 'text-green-400'
    },
    {
      icon: FileCode,
      title: 'Context Aware',
      description: isCompact ? 'Project-aware AI' : 'AI understands your project structure and dependencies',
      color: 'text-purple-400'
    },
    {
      icon: Bot,
      title: 'Smart Suggestions',
      description: isCompact ? 'Intelligent suggestions' : 'Get intelligent code suggestions and improvements',
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className={`h-full ${isCompact ? 'p-3' : 'p-6'}`}>
      <div className={`mb-${isCompact ? '3' : '6'}`}>
        <div className={`flex items-center justify-between mb-${isCompact ? '2' : '4'}`}>
          <div>
            <h1 className={`font-bold text-white mb-2 flex items-center gap-${isCompact ? '2' : '3'} ${
              isCompact ? 'text-lg' : 'text-3xl'
            }`}>
              <Code2 className={`${isCompact ? 'h-5 w-5' : 'h-8 w-8'} text-blue-400`} />
              CodeBridge
            </h1>
            <p className={`text-gray-400 ${isCompact ? 'text-xs' : ''}`}>
              {isCompact ? 'AI-powered code generation' : 'AI-powered code generation and assistance for your IDE'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {!isCompact && (
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Zap className="h-4 w-4 mr-1" />
                AI Powered
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedView(!expandedView)}
              className="text-gray-400 hover:text-white"
            >
              {expandedView ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Feature Overview - Hide in compact mode or when expanded */}
        {!isCompact && !expandedView && (
          <div className={`grid gap-${isCompact ? '2' : '4'} mb-${isCompact ? '3' : '6'} ${
            isMedium 
              ? 'grid-cols-1 md:grid-cols-2' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 p-4">
                <div className="flex items-start space-x-3">
                  <feature.icon className={`h-6 w-6 ${feature.color} mt-1`} />
                  <div>
                    <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                    <p className="text-gray-400 text-xs mt-1">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Tabs defaultValue="generator" className="h-full">
        <TabsList className={`bg-gray-800 mb-${isCompact ? '2' : '4'}`}>
          <TabsTrigger 
            value="generator" 
            className={`flex items-center gap-2 ${isCompact ? 'text-xs px-2 py-1' : ''}`}
          >
            <Wand2 className="h-4 w-4" />
            {isCompact ? 'Generator' : 'Code Generator'}
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            className={`flex items-center gap-2 ${isCompact ? 'text-xs px-2 py-1' : ''}`}
          >
            <MessageSquare className="h-4 w-4" />
            {isCompact ? 'Assistant' : 'AI Assistant'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="h-full">
          <CodeGenerator containerSize={containerSize} />
        </TabsContent>

        <TabsContent value="chat" className="h-full">
          <div className="grid grid-cols-1 gap-6 h-full">
            <CodeBridgeChat projectId={projectId} containerSize={containerSize} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
