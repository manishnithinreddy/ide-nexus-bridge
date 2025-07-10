
import React from 'react';
import { ServiceCard } from '@/components/Dashboard/ServiceCard';
import { QuickActions } from '@/components/Dashboard/QuickActions';
import { RecentActivity } from '@/components/Dashboard/RecentActivity';
import { 
  GitBranch, 
  Container, 
  Zap, 
  Server, 
  Database
} from 'lucide-react';

interface DashboardProps {
  containerSize?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ containerSize }) => {
  const isCompact = containerSize === 'compact';
  const isMedium = containerSize === 'medium';
  
  const services = [
    {
      title: 'GitLab',
      description: 'Version control & CI/CD',
      icon: GitBranch,
      status: 'online' as const,
      color: 'orange',
      metrics: [
        { label: 'Active MRs', value: '12' },
        { label: 'Pipelines', value: '3' },
      ],
      actions: [
        { label: 'New MR', onClick: () => console.log('New MR') },
        { label: 'View Pipelines', onClick: () => console.log('View Pipelines') },
      ],
    },
    {
      title: 'Docker',
      description: 'Container management',
      icon: Container,
      status: 'online' as const,
      color: 'cyan',
      metrics: [
        { label: 'Running', value: '8' },
        { label: 'Images', value: '24' },
      ],
      actions: [
        { label: 'View Containers', onClick: () => console.log('View Containers') },
        { label: 'Build Image', onClick: () => console.log('Build Image') },
      ],
    },
    {
      title: 'API Testing',
      description: 'REST & GraphQL testing',
      icon: Zap,
      status: 'online' as const,
      color: 'green',
      metrics: [
        { label: 'Collections', value: '15' },
        { label: 'Tests Run', value: '342' },
      ],
      actions: [
        { label: 'New Request', onClick: () => console.log('New Request') },
        { label: 'Run Collection', onClick: () => console.log('Run Collection') },
      ],
    },
    {
      title: 'Servers',
      description: 'Infrastructure monitoring',
      icon: Server,
      status: 'warning' as const,
      color: 'purple',
      metrics: [
        { label: 'Online', value: '4/5' },
        { label: 'Load Avg', value: '0.8' },
      ],
      actions: [
        { label: 'View Logs', onClick: () => console.log('View Logs') },
        { label: 'SSH Connect', onClick: () => console.log('SSH Connect') },
      ],
    },
    {
      title: 'AI-DB',
      description: 'Database & AI services',
      icon: Database,
      status: 'online' as const,
      color: 'pink',
      metrics: [
        { label: 'Connections', value: '23' },
        { label: 'Queries/min', value: '156' },
      ],
      actions: [
        { label: 'Query Builder', onClick: () => console.log('Query Builder') },
        { label: 'AI Assistant', onClick: () => console.log('AI Assistant') },
      ],
    },
  ];

  return (
    <div className={`space-y-${isCompact ? '3' : '6'} ${isCompact ? 'p-3' : 'p-6'}`}>
      {/* Header */}
      <div>
        <h1 className={`font-bold text-white mb-2 ${isCompact ? 'text-xl' : 'text-3xl'}`}>
          DevOps Dashboard
        </h1>
        <p className={`text-gray-400 ${isCompact ? 'text-sm' : ''}`}>
          {isCompact ? 'DevOps workflow management' : 'Manage your development workflow from a single interface'}
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions containerSize={containerSize} />

      {/* Services Grid */}
      <div className={`grid gap-${isCompact ? '3' : '6'} ${
        isCompact 
          ? 'grid-cols-1' 
          : isMedium 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
      }`}>
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} containerSize={containerSize} />
        ))}
      </div>

      {/* Recent Activity */}
      {!isCompact && <RecentActivity />}
    </div>
  );
};
