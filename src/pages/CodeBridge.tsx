
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeGenerator } from '@/components/CodeGeneration/CodeGenerator';
import { CodeBridgeChat } from '@/components/Chat/CodeBridgeChat';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, MessageSquare, FileCode, Bot, Zap, Code2 } from 'lucide-react';

export const CodeBridge = () => {
  const [projectId] = useState('default-project');
  
  const features = [
    {
      icon: Wand2,
      title: 'AI Code Generation',
      description: 'Generate code from natural language descriptions',
      color: 'text-blue-400'
    },
    {
      icon: MessageSquare,
      title: 'Interactive Chat',
      description: 'Chat with AI about your code and get instant help',
      color: 'text-green-400'
    },
    {
      icon: FileCode,
      title: 'Context Aware',
      description: 'AI understands your project structure and dependencies',
      color: 'text-purple-400'
    },
    {
      icon: Bot,
      title: 'Smart Suggestions',
      description: 'Get intelligent code suggestions and improvements',
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Code2 className="h-8 w-8 text-blue-400" />
              CodeBridge
            </h1>
            <p className="text-gray-400">
              AI-powered code generation and assistance for your IDE
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <Zap className="h-4 w-4 mr-1" />
            AI Powered
          </Badge>
        </div>

        {/* Feature Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
      </div>

      <Tabs defaultValue="generator" className="h-full">
        <TabsList className="bg-gray-800 mb-4">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Code Generator
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="h-full">
          <CodeGenerator />
        </TabsContent>

        <TabsContent value="chat" className="h-full">
          <div className="grid grid-cols-1 gap-6 h-full">
            <CodeBridgeChat projectId={projectId} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
