
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Dashboard } from "@/pages/Dashboard";
import { ApiTesting } from "@/pages/ApiTesting";
import { CodeBridge } from "@/pages/CodeBridge";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="flex h-screen bg-gray-900 text-white">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/api-testing" element={<ApiTesting />} />
              <Route path="/code-bridge" element={<CodeBridge />} />
              <Route path="/gitlab" element={<div className="p-6"><h1 className="text-2xl font-bold">GitLab Integration</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>} />
              <Route path="/docker" element={<div className="p-6"><h1 className="text-2xl font-bold">Docker Management</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>} />
              <Route path="/servers" element={<div className="p-6"><h1 className="text-2xl font-bold">Server Management</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>} />
              <Route path="/ai-db" element={<div className="p-6"><h1 className="text-2xl font-bold">AI-DB Services</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>} />
              <Route path="/team" element={<div className="p-6"><h1 className="text-2xl font-bold">Team Management</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>} />
              <Route path="/activity" element={<div className="p-6"><h1 className="text-2xl font-bold">Activity Feed</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>} />
              <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
