
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Copy, Code2 } from 'lucide-react';
import { apiService } from '@/services/api';
import { ChatMessage } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

interface CodeBridgeChatProps {
  projectId: string;
  containerSize?: string;
}

export const CodeBridgeChat: React.FC<CodeBridgeChatProps> = ({ projectId, containerSize }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isCompact = containerSize === 'compact';

  useEffect(() => {
    loadChatHistory();
  }, [projectId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const history = await apiService.getChatHistory(projectId);
      setMessages(history);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiService.sendChatMessage(projectId, input);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: 'Copied', description: 'Code copied to clipboard!' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <div className={`border-b border-gray-700 ${isCompact ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
            CodeBridge Assistant
          </h3>
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            <Bot className="h-3 w-3 mr-1" />
            AI Assistant
          </Badge>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto space-y-4 ${isCompact ? 'p-3' : 'p-4'}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg ${isCompact ? 'p-2' : 'p-3'} ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
                <span className="text-xs opacity-75">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              <div className={`whitespace-pre-wrap ${isCompact ? 'text-xs' : 'text-sm'}`}>
                {message.content}
              </div>
              
              {message.codeBlocks && message.codeBlocks.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.codeBlocks.map((block, index) => (
                    <div key={index} className="bg-gray-900 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Code2 className="h-4 w-4" />
                          <span className="text-xs text-gray-400">
                            {block.language}
                          </span>
                          {block.filename && (
                            <span className="text-xs text-gray-500">
                              {block.filename}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyCode(block.code)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <pre className={`text-green-400 overflow-x-auto ${isCompact ? 'text-xs' : 'text-sm'}`}>
                        <code>{block.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className={`bg-gray-700 text-gray-100 rounded-lg max-w-[80%] ${isCompact ? 'p-2' : 'p-3'}`}>
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span className={isCompact ? 'text-xs' : 'text-sm'}>Thinking...</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className={`border-t border-gray-700 ${isCompact ? 'p-3' : 'p-4'}`}>
        <div className="flex space-x-2">
          <Input
            placeholder={isCompact ? "Ask me anything..." : "Ask me anything about your code..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`bg-gray-700 border-gray-600 text-white ${isCompact ? 'text-sm' : ''}`}
            disabled={loading}
          />
          <Button 
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700"
            size={isCompact ? "sm" : "default"}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
