import { Component } from '@angular/core';

interface Collection {
  id: number;
  name: string;
  requests: number;
  lastRun: string;
  status: 'passed' | 'failed';
}

interface HistoryItem {
  id: number;
  method: string;
  url: string;
  status: number;
  duration: string;
  timestamp: string;
}

@Component({
  selector: 'app-api-testing',
  templateUrl: './api-testing.component.html',
  styleUrls: ['./api-testing.component.scss']
})
export class ApiTestingComponent {
  collections: Collection[] = [
    {
      id: 1,
      name: 'Authentication API',
      requests: 12,
      lastRun: '2 hours ago',
      status: 'passed'
    },
    {
      id: 2,
      name: 'User Management',
      requests: 8,
      lastRun: '1 day ago',
      status: 'failed'
    },
    {
      id: 3,
      name: 'Product API',
      requests: 15,
      lastRun: '3 hours ago',
      status: 'passed'
    }
  ];

  history: HistoryItem[] = [
    {
      id: 1,
      method: 'POST',
      url: 'https://api.example.com/auth/login',
      status: 200,
      duration: '245ms',
      timestamp: '14:30:25'
    },
    {
      id: 2,
      method: 'GET',
      url: 'https://api.example.com/users',
      status: 200,
      duration: '120ms',
      timestamp: '14:28:10'
    },
    {
      id: 3,
      method: 'PUT',
      url: 'https://api.example.com/users/123',
      status: 404,
      duration: '89ms',
      timestamp: '14:25:45'
    }
  ];

  getStatusClass(status: number): string {
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 400 && status < 500) return 'status-client-error';
    if (status >= 500) return 'status-server-error';
    return '';
  }
}