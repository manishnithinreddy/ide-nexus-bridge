import { Component, Input } from '@angular/core';

interface ServiceData {
  title: string;
  description: string;
  icon: string;
  status: 'online' | 'offline' | 'warning';
  color: string;
  metrics: { label: string; value: string }[];
  actions: { label: string; action: string }[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input() containerSize: 'compact' | 'medium' | 'normal' = 'normal';

  services: ServiceData[] = [
    {
      title: 'GitLab',
      description: 'Version control & CI/CD',
      icon: 'git-branch',
      status: 'online',
      color: 'orange',
      metrics: [
        { label: 'Active MRs', value: '12' },
        { label: 'Pipelines', value: '3' }
      ],
      actions: [
        { label: 'New MR', action: 'new-mr' },
        { label: 'View Pipelines', action: 'view-pipelines' }
      ]
    },
    {
      title: 'Docker',
      description: 'Container management',
      icon: 'container',
      status: 'online',
      color: 'cyan',
      metrics: [
        { label: 'Running', value: '8' },
        { label: 'Images', value: '24' }
      ],
      actions: [
        { label: 'View Containers', action: 'view-containers' },
        { label: 'Build Image', action: 'build-image' }
      ]
    },
    {
      title: 'API Testing',
      description: 'REST & GraphQL testing',
      icon: 'zap',
      status: 'online',
      color: 'green',
      metrics: [
        { label: 'Collections', value: '15' },
        { label: 'Tests Run', value: '342' }
      ],
      actions: [
        { label: 'New Request', action: 'new-request' },
        { label: 'Run Collection', action: 'run-collection' }
      ]
    },
    {
      title: 'Servers',
      description: 'Infrastructure monitoring',
      icon: 'server',
      status: 'warning',
      color: 'purple',
      metrics: [
        { label: 'Online', value: '4/5' },
        { label: 'Load Avg', value: '0.8' }
      ],
      actions: [
        { label: 'View Logs', action: 'view-logs' },
        { label: 'SSH Connect', action: 'ssh-connect' }
      ]
    },
    {
      title: 'AI-DB',
      description: 'Database & AI services',
      icon: 'database',
      status: 'online',
      color: 'pink',
      metrics: [
        { label: 'Connections', value: '23' },
        { label: 'Queries/min', value: '156' }
      ],
      actions: [
        { label: 'Query Builder', action: 'query-builder' },
        { label: 'AI Assistant', action: 'ai-assistant' }
      ]
    }
  ];

  getGridClass(): string {
    switch (this.containerSize) {
      case 'compact':
        return 'grid-compact';
      case 'medium':
        return 'grid-medium';
      default:
        return 'grid-normal';
    }
  }

  handleQuickAction(action: string) {
    console.log('Quick action:', action);
    // Implement quick action handling
  }

  handleServiceAction(action: string) {
    console.log('Service action:', action);
    // Implement service action handling
  }
}