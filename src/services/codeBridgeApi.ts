
import { CodeBridgeService, AIModel, DockerContainer, GitLabProject, Server, Team, MonitoringMetric } from '@/types/codebridge';

const API_BASE_URL = process.env.REACT_APP_CODEBRIDGE_API_URL || 'http://localhost:8080';

class CodeBridgeAPI {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('codebridge_token')}`,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Gateway Service
  async getServices(): Promise<CodeBridgeService[]> {
    return this.request<CodeBridgeService[]>('/api/gateway/services');
  }

  // AI Service
  async getAIModels(): Promise<AIModel[]> {
    return this.request<AIModel[]>('/api/ai/models');
  }

  async generateCode(prompt: string, model?: string): Promise<{ code: string; explanation: string }> {
    return this.request('/api/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, model }),
    });
  }

  async getTextEmbedding(text: string): Promise<{ embedding: number[] }> {
    return this.request('/api/ai/embed', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  // Docker Service
  async getContainers(): Promise<DockerContainer[]> {
    return this.request<DockerContainer[]>('/api/docker/containers');
  }

  async startContainer(containerId: string): Promise<void> {
    return this.request(`/api/docker/containers/${containerId}/start`, {
      method: 'POST',
    });
  }

  async stopContainer(containerId: string): Promise<void> {
    return this.request(`/api/docker/containers/${containerId}/stop`, {
      method: 'POST',
    });
  }

  // GitLab Service
  async getProjects(): Promise<GitLabProject[]> {
    return this.request<GitLabProject[]>('/api/gitlab/projects');
  }

  async triggerJob(projectId: string, jobId: string): Promise<void> {
    return this.request(`/api/gitlab/projects/${projectId}/jobs/${jobId}/trigger`, {
      method: 'POST',
    });
  }

  // Server Service
  async getServers(): Promise<Server[]> {
    return this.request<Server[]>('/api/servers');
  }

  async executeCommand(serverId: string, command: string): Promise<{ output: string }> {
    return this.request(`/api/servers/${serverId}/execute`, {
      method: 'POST',
      body: JSON.stringify({ command }),
    });
  }

  // Teams Service
  async getTeams(): Promise<Team[]> {
    return this.request<Team[]>('/api/teams');
  }

  async createTeam(name: string): Promise<Team> {
    return this.request('/api/teams', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  // Monitoring Service
  async getMetrics(): Promise<MonitoringMetric[]> {
    return this.request<MonitoringMetric[]>('/api/monitoring/metrics');
  }

  // Security Service
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const response = await this.request<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    localStorage.setItem('codebridge_token', response.token);
    return response;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('codebridge_token');
    return this.request('/api/auth/logout', { method: 'POST' });
  }
}

export const codeBridgeApi = new CodeBridgeAPI();
