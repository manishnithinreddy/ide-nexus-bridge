import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CodeBridgeService {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance' | 'warning';
  description: string;
  endpoints: string[];
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  capabilities: string[];
}

export interface DockerContainer {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'paused';
  image: string;
  ports: string[];
}

export interface GitLabProject {
  id: string;
  name: string;
  url: string;
  lastCommit: string;
  status: string;
}

export interface Server {
  id: string;
  name: string;
  host: string;
  status: 'online' | 'offline';
  type: 'development' | 'staging' | 'production';
}

export interface Team {
  id: string;
  name: string;
  memberCount: number;
  created: string;
}

export interface MonitoringMetric {
  service: string;
  metric: string;
  value: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodeBridgeApiService {
  private apiUrl = environment.codeBridgeApiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('codebridge_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Gateway Service
  async getServices(): Promise<CodeBridgeService[]> {
    return firstValueFrom(
      this.http.get<CodeBridgeService[]>(`${this.apiUrl}/api/gateway/services`, {
        headers: this.getHeaders()
      })
    );
  }

  // AI Service
  async getAIModels(): Promise<AIModel[]> {
    return firstValueFrom(
      this.http.get<AIModel[]>(`${this.apiUrl}/api/ai/models`, {
        headers: this.getHeaders()
      })
    );
  }

  async generateCode(prompt: string, model?: string): Promise<{ code: string; explanation: string }> {
    return firstValueFrom(
      this.http.post<{ code: string; explanation: string }>(`${this.apiUrl}/api/ai/generate`, 
        { prompt, model }, 
        { headers: this.getHeaders() }
      )
    );
  }

  async getTextEmbedding(text: string): Promise<{ embedding: number[] }> {
    return firstValueFrom(
      this.http.post<{ embedding: number[] }>(`${this.apiUrl}/api/ai/embed`, 
        { text }, 
        { headers: this.getHeaders() }
      )
    );
  }

  // Docker Service
  async getContainers(): Promise<DockerContainer[]> {
    return firstValueFrom(
      this.http.get<DockerContainer[]>(`${this.apiUrl}/api/docker/containers`, {
        headers: this.getHeaders()
      })
    );
  }

  async startContainer(containerId: string): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/api/docker/containers/${containerId}/start`, 
        {}, 
        { headers: this.getHeaders() }
      )
    );
  }

  async stopContainer(containerId: string): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/api/docker/containers/${containerId}/stop`, 
        {}, 
        { headers: this.getHeaders() }
      )
    );
  }

  // GitLab Service
  async getProjects(): Promise<GitLabProject[]> {
    return firstValueFrom(
      this.http.get<GitLabProject[]>(`${this.apiUrl}/api/gitlab/projects`, {
        headers: this.getHeaders()
      })
    );
  }

  async triggerJob(projectId: string, jobId: string): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/api/gitlab/projects/${projectId}/jobs/${jobId}/trigger`, 
        {}, 
        { headers: this.getHeaders() }
      )
    );
  }

  // Server Service
  async getServers(): Promise<Server[]> {
    return firstValueFrom(
      this.http.get<Server[]>(`${this.apiUrl}/api/servers`, {
        headers: this.getHeaders()
      })
    );
  }

  async executeCommand(serverId: string, command: string): Promise<{ output: string }> {
    return firstValueFrom(
      this.http.post<{ output: string }>(`${this.apiUrl}/api/servers/${serverId}/execute`, 
        { command }, 
        { headers: this.getHeaders() }
      )
    );
  }

  // Teams Service
  async getTeams(): Promise<Team[]> {
    return firstValueFrom(
      this.http.get<Team[]>(`${this.apiUrl}/api/teams`, {
        headers: this.getHeaders()
      })
    );
  }

  async createTeam(name: string): Promise<Team> {
    return firstValueFrom(
      this.http.post<Team>(`${this.apiUrl}/api/teams`, 
        { name }, 
        { headers: this.getHeaders() }
      )
    );
  }

  // Monitoring Service
  async getMetrics(): Promise<MonitoringMetric[]> {
    return firstValueFrom(
      this.http.get<MonitoringMetric[]>(`${this.apiUrl}/api/monitoring/metrics`, {
        headers: this.getHeaders()
      })
    );
  }

  // Security Service
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const response = await firstValueFrom(
      this.http.post<{ token: string; user: any }>(`${this.apiUrl}/api/auth/login`, 
        { email, password }
      )
    );
    
    localStorage.setItem('codebridge_token', response.token);
    return response;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('codebridge_token');
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/api/auth/logout`, 
        {}, 
        { headers: this.getHeaders() }
      )
    );
  }
}