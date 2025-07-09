
import { CodeGenerationRequest, CodeGenerationResponse, ProjectContext, ChatMessage } from '@/types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
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

  async generateCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
    return this.request<CodeGenerationResponse>('/api/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getChatHistory(projectId: string): Promise<ChatMessage[]> {
    return this.request<ChatMessage[]>(`/api/chat/${projectId}/history`);
  }

  async sendChatMessage(projectId: string, message: string): Promise<ChatMessage> {
    return this.request<ChatMessage>(`/api/chat/${projectId}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getProjectContext(projectId: string): Promise<ProjectContext> {
    return this.request<ProjectContext>(`/api/project/${projectId}`);
  }

  async updateProjectContext(projectId: string, context: Partial<ProjectContext>): Promise<ProjectContext> {
    return this.request<ProjectContext>(`/api/project/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(context),
    });
  }

  async analyzeCode(code: string, language: string): Promise<any> {
    return this.request('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ code, language }),
    });
  }
}

export const apiService = new ApiService();
