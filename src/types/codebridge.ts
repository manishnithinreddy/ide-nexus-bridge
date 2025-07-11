
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
