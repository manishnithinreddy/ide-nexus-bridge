
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
              <Route path="/code-bridge" element={<CodeBridge />} />
              <Route path="/api-testing" element={<ApiTesting />} />
              <Route path="/gitlab" element={<GitLab />} />
              <Route path="/docker" element={<Docker />} />
              <Route path="/servers" element={<Servers />} />
              <Route path="/ai-db" element={<AiDb />} />
              <Route path="/team" element={<Team />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
