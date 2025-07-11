import { Component, Input, OnInit } from '@angular/core';
import { CodeBridgeService } from '../../core/services/codebridge-api.service';

interface Service {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  description: string;
  endpoints: string[];
}

@Component({
  selector: 'app-code-bridge',
  templateUrl: './code-bridge.component.html',
  styleUrls: ['./code-bridge.component.scss']
})
export class CodeBridgeComponent implements OnInit {
  @Input() containerSize: 'compact' | 'medium' | 'normal' = 'normal';
  
  activeTabIndex = 0;
  services: Service[] = [];

  constructor(private codeBridgeService: CodeBridgeService) {}

  ngOnInit() {
    this.loadServices();
  }

  async loadServices() {
    try {
      this.services = await this.codeBridgeService.getServices();
    } catch (error) {
      console.error('Failed to load services:', error);
      // Use fallback data
      this.services = this.getFallbackServices();
    }
  }

  getFallbackServices(): Service[] {
    return [
      {
        id: 'gateway',
        name: 'Gateway Service',
        status: 'online',
        description: 'API routing, security, and load balancing',
        endpoints: ['/api/gateway', '/api/health', '/api/docs', '/api/route']
      },
      {
        id: 'ai',
        name: 'AI Service',
        status: 'online',
        description: 'Text completion, embeddings, and model management',
        endpoints: ['/api/ai/models', '/api/ai/generate', '/api/ai/embed', '/api/ai/auth']
      },
      {
        id: 'docker',
        name: 'Docker Service',
        status: 'online',
        description: 'Container, image, and registry management',
        endpoints: ['/api/docker/containers', '/api/docker/images', '/api/docker/auth']
      },
      {
        id: 'gitlab',
        name: 'GitLab Service',
        status: 'online',
        description: 'Git integration, CI/CD jobs, and stash management',
        endpoints: ['/api/gitlab/projects', '/api/gitlab/jobs', '/api/gitlab/auth']
      },
      {
        id: 'security',
        name: 'Security Service',
        status: 'online',
        description: 'Authentication, RBAC, and API key management',
        endpoints: ['/api/auth', '/api/users', '/api/roles', '/api/organizations']
      },
      {
        id: 'monitoring',
        name: 'Monitoring Service',
        status: 'online',
        description: 'Metrics, audit logs, and admin dashboard',
        endpoints: ['/api/monitoring/metrics', '/api/monitoring/logs', '/api/monitoring/webhooks']
      },
      {
        id: 'server',
        name: 'Server Service',
        status: 'warning',
        description: 'SSH access, remote operations, and server management',
        endpoints: ['/api/servers', '/api/ssh', '/api/remote', '/api/logs']
      }
    ];
  }

  handleQuickAction(action: string) {
    console.log('Quick action:', action);
    // Implement quick action handling
  }

  handleServiceClick(service: Service) {
    console.log('Service clicked:', service);
    // Implement service click handling
  }
}