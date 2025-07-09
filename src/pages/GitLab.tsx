
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitBranch, 
  GitPullRequest, 
  GitCommit, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Search,
  Settings
} from 'lucide-react';

export const GitLab = () => {
  const [repositories, setRepositories] = useState([
    {
      id: 1,
      name: 'codeBridge',
      description: 'AI-powered code generation service',
      branch: 'codegen-bot',
      lastCommit: '2 hours ago',
      status: 'active',
      mergeRequests: 3,
      pipelines: 'passing'
    },
    {
      id: 2,
      name: 'devops-toolkit',
      description: 'Cross-platform IDE plugin for DevOps',
      branch: 'main',
      lastCommit: '1 day ago',
      status: 'active',
      mergeRequests: 1,
      pipelines: 'failed'
    }
  ]);

  const [mergeRequests] = useState([
    {
      id: 1,
      title: 'Add code generation endpoints',
      author: 'John Doe',
      branch: 'feature/code-gen',
      status: 'open',
      created: '2 days ago',
      commits: 5
    },
    {
      id: 2,
      title: 'Fix authentication middleware',
      author: 'Jane Smith',
      branch: 'bugfix/auth',
      status: 'merged',
      created: '1 week ago',
      commits: 3
    }
  ]);

  const [pipelines] = useState([
    {
      id: 1,
      commit: 'feat: add AI integration',
      branch: 'codegen-bot',
      status: 'passed',
      duration: '3m 24s',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      commit: 'fix: update dependencies',
      branch: 'main',
      status: 'failed',
      duration: '1m 45s',
      timestamp: '1 day ago'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'running': return 'text-yellow-400';
      case 'open': return 'text-blue-400';
      case 'merged': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'open': return <GitPullRequest className="h-4 w-4" />;
      case 'merged': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">GitLab Integration</h1>
          <p className="text-gray-400">Manage repositories, merge requests, and CI/CD pipelines</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            New Repository
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="repositories" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="merge-requests">Merge Requests</TabsTrigger>
          <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
        </TabsList>

        <TabsContent value="repositories" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search repositories..." 
                className="pl-10 bg-gray-800 border-gray-600"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {repositories.map((repo) => (
              <Card key={repo.id} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <GitBranch className="h-5 w-5 text-orange-400" />
                      <h3 className="text-lg font-semibold text-white">{repo.name}</h3>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {repo.branch}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-4">{repo.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <span>Last commit: {repo.lastCommit}</span>
                      <span className="flex items-center">
                        <GitPullRequest className="h-4 w-4 mr-1" />
                        {repo.mergeRequests} MRs
                      </span>
                      <span className={`flex items-center ${repo.pipelines === 'passing' ? 'text-green-400' : 'text-red-400'}`}>
                        {repo.pipelines === 'passing' ? 
                          <CheckCircle className="h-4 w-4 mr-1" /> : 
                          <XCircle className="h-4 w-4 mr-1" />
                        }
                        Pipeline {repo.pipelines}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600">
                      Clone
                    </Button>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Open
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="merge-requests" className="space-y-4">
          <div className="grid gap-4">
            {mergeRequests.map((mr) => (
              <Card key={mr.id} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`${getStatusColor(mr.status)}`}>
                        {getStatusIcon(mr.status)}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{mr.title}</h3>
                      <Badge 
                        variant="outline" 
                        className={`border-gray-600 ${getStatusColor(mr.status)}`}
                      >
                        {mr.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {mr.author}
                      </span>
                      <span className="flex items-center">
                        <GitBranch className="h-4 w-4 mr-1" />
                        {mr.branch}
                      </span>
                      <span className="flex items-center">
                        <GitCommit className="h-4 w-4 mr-1" />
                        {mr.commits} commits
                      </span>
                      <span>Created {mr.created}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600">
                      Review
                    </Button>
                    {mr.status === 'open' && (
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        Merge
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pipelines" className="space-y-4">
          <div className="grid gap-4">
            {pipelines.map((pipeline) => (
              <Card key={pipeline.id} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${getStatusColor(pipeline.status)}`}>
                      {getStatusIcon(pipeline.status)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{pipeline.commit}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <span className="flex items-center">
                          <GitBranch className="h-4 w-4 mr-1" />
                          {pipeline.branch}
                        </span>
                        <span>Duration: {pipeline.duration}</span>
                        <span>{pipeline.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={`border-gray-600 ${getStatusColor(pipeline.status)}`}
                    >
                      {pipeline.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="border-gray-600">
                      View Logs
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
