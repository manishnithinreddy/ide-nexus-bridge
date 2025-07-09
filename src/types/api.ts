
export interface CodeGenerationRequest {
  prompt: string;
  language?: string;
  framework?: string;
  context?: string;
}

export interface CodeGenerationResponse {
  id: string;
  code: string;
  language: string;
  explanation?: string;
  suggestions?: string[];
  timestamp: string;
}

export interface ProjectContext {
  id: string;
  name: string;
  description?: string;
  files: ProjectFile[];
  dependencies: string[];
}

export interface ProjectFile {
  path: string;
  content: string;
  language: string;
  lastModified: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  codeBlocks?: CodeBlock[];
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
