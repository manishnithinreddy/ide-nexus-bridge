
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
  closeable?: boolean;
}

interface TabManagerProps {
  tabs: Tab[];
  onTabClose?: (tabId: string) => void;
  onNewTab?: () => void;
}

export const TabManager: React.FC<TabManagerProps> = ({
  tabs,
  onTabClose,
  onNewTab,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center bg-gray-800 border-b border-gray-700">
          <TabsList className="bg-transparent h-10 p-0">
            {tabs.map((tab) => (
              <div key={tab.id} className="flex items-center group">
                <TabsTrigger
                  value={tab.id}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-none border-b-2 border-transparent',
                    'data-[state=active]:border-blue-400 data-[state=active]:text-white',
                    'text-gray-400 hover:text-white hover:bg-gray-700'
                  )}
                >
                  {tab.title}
                </TabsTrigger>
                {tab.closeable && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onTabClose?.(tab.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </TabsList>
          
          {onNewTab && (
            <Button
              size="sm"
              variant="ghost"
              className="ml-2 h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
              onClick={onNewTab}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
