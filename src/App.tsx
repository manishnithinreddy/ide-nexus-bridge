
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Dashboard } from "@/pages/Dashboard";
import { ApiTesting } from "@/pages/ApiTesting";
import { CodeBridge } from "@/pages/CodeBridge";
import { GitLab } from "@/pages/GitLab";
import { Docker } from "@/pages/Docker";
import { Servers } from "@/pages/Servers";
import { AiDb } from "@/pages/AiDb";
import { Team } from "@/pages/Team";
import { Activity } from "@/pages/Activity";
import { Settings } from "@/pages/Settings";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Menu, X } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [containerSize, setContainerSize] = useState('normal');

  // Detect container size on mount and resize
  useEffect(() => {
    const detectContainerSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width < 768 || height < 600) {
        setContainerSize('compact');
        setSidebarCollapsed(true);
      } else if (width < 1024) {
        setContainerSize('medium');
      } else {
        setContainerSize('normal');
      }
    };

    detectContainerSize();
    window.addEventListener('resize', detectContainerSize);
    return () => window.removeEventListener('resize', detectContainerSize);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className={`flex h-screen bg-gray-900 text-white relative ${containerSize === 'compact' ? 'text-sm' : ''}`}>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden absolute top-2 left-2 z-50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-gray-800"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>

            {/* Fullscreen Toggle */}
            <div className="absolute top-2 right-2 z-50">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-gray-800"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>

            {/* Sidebar */}
            <div className={`
              ${sidebarCollapsed ? 'w-0 md:w-16' : 'w-64'} 
              ${isMobileMenuOpen ? 'w-64' : 'w-0 md:w-16'} 
              ${containerSize === 'compact' ? 'absolute md:relative z-40' : ''}
              transition-all duration-300 ease-in-out bg-gray-900 border-r border-gray-800
            `}>
              <Sidebar 
                collapsed={sidebarCollapsed && !isMobileMenuOpen} 
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                containerSize={containerSize}
              />
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && containerSize === 'compact' && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            {/* Main Content */}
            <main className={`
              flex-1 overflow-auto
              ${containerSize === 'compact' ? 'px-2 py-1' : 'px-0 py-0'}
            `}>
              <Routes>
                <Route path="/" element={<Dashboard containerSize={containerSize} />} />
                <Route path="/code-bridge" element={<CodeBridge containerSize={containerSize} />} />
                <Route path="/api-testing" element={<ApiTesting containerSize={containerSize} />} />
                <Route path="/gitlab" element={<GitLab containerSize={containerSize} />} />
                <Route path="/docker" element={<Docker containerSize={containerSize} />} />
                <Route path="/servers" element={<Servers containerSize={containerSize} />} />
                <Route path="/ai-db" element={<AiDb containerSize={containerSize} />} />
                <Route path="/team" element={<Team containerSize={containerSize} />} />
                <Route path="/activity" element={<Activity containerSize={containerSize} />} />
                <Route path="/settings" element={<Settings containerSize={containerSize} />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
