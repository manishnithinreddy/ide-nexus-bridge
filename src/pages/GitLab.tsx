
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  Play, 
  Pause, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface GitLabProps {
  containerSize?: string;
}

export const GitLab: React.FC<GitLabProps> = ({ containerSize }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const isCompact = containerSize === 'compact';

  const projects = [
    { name: 'web-app', branch: 'main', status: 'active', lastCommit: '2 hours ago' },
    { name: 'api-service', branch: 'develop', status: 'active', lastCommit: '5 hours ago' },
    { name: 'mobile-app', branch: 'feature/auth', status: 'inactive', lastCommit: '1 day ago' },
  ];

  const pipelines = [
    { id: 1, project: 'web-app', status: 'success', branch: 'main', duration: '3m 24s' },
    { id: 2, project: 'api-service', status: 'running', branch: 'develop', duration: '1m 45s' },
    { id: 3, project: 'mobile-app', status: 'failed', branch: 'feature/auth', duration: '2m 12s' },
  ];

  const mergeRequests = [
    { id: 1, title: 'Add user authentication', author: 'john.doe', status: 'open', target: 'main' },
    { id: 2, title: 'Fix API response format', author: 'jane.smith', status: 'merged', target: 'develop' },
    { id: 3, title: 'Update documentation', author: 'bob.wilson', status: 'open', target: 'main' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'running': return <Play className="h-4 w-4 text-blue-400" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <div className={`space-y-${isCompact ? '3' : '6'} ${isCompact ? 'p-3' : 'p-6'}`}>
      <div>
        <h1 className={`font-bold text-white mb-2 flex items-center gap-3 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
          <GitBranch className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8'} text-orange-400`} />
          GitLab Integration
        </h1>
        <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
          {isCompact ? 'Manage GitLab projects & CI/CD' : 'Manage your GitLab projects, pipelines, and merge requests'}
        </p>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="projects" className={isCompact ? 'text-xs px-2' : ''}>Projects</TabsTrigger>
          <TabsTrigger value="pipelines" className={isCompact ? 'text-xs px-2' : ''}>Pipelines</TabsTrigger>
          <TabsTrigger value="merge-requests" className={isCompact ? 'text-xs px-2' : ''}>
            {isCompact ? 'MRs' : 'Merge Requests'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className={`grid gap-${isCompact ? '3' : '4'} ${isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {projects.map((project, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <div className={isCompact ? 'p-3' : 'p-4'}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>{project.name}</h3>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Branch: {project.branch}</p>
                  <p className="text-gray-500 text-xs mb-3">Last commit: {project.lastCommit}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                      <GitCommit className="h-4 w-4 mr-1" />
                      {isCompact ? 'View' : 'View Commits'}
                    </Button>
                    <Button size="sm" variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                      <GitPullRequest className="h-4 w-4 mr-1" />
                      {isCompact ? 'MR' : 'New MR'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pipelines" className="space-y-4">
          <div className="space-y-3">
            {pipelines.map((pipeline) => (
              <Card key={pipeline.id} className="bg-gray-800 border-gray-700">
                <div className={isCompact ? 'p-3' : 'p-4'}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(pipeline.status)}
                      <div>
                        <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                          {pipeline.project}
                        </h3>
                        <p className="text-gray-400 text-sm">{pipeline.branch}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={pipeline.status === 'success' ? 'default' : pipeline.status === 'failed' ? 'destructive' : 'secondary'}>
                        {pipeline.status}
                      </Badge>
                      <p className="text-gray-500 text-xs mt-1">{pipeline.duration}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="merge-requests" className="space-y-4">
          <div className="space-y-3">
            {mergeRequests.map((mr) => (
              <Card key={mr.id} className="bg-gray-800 border-gray-700">
                <div className={isCompact ? 'p-3' : 'p-4'}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
                        {mr.title}
                      </h3>
                      <p className="text-gray-400 text-sm">by {mr.author} → {mr.target}</p>
                    </div>
                    <Badge variant={mr.status === 'merged' ? 'default' : 'secondary'}>
                      {mr.status}
                    </Badge>
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
