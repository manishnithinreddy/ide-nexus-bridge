import { Component, Input, Output, EventEmitter } from '@angular/core';

interface QuickAction {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss']
})
export class QuickActionsComponent {
  @Input() containerSize: 'compact' | 'medium' | 'normal' = 'normal';
  @Output() actionClick = new EventEmitter<string>();

  quickActions: QuickAction[] = [
    { 
      id: 'generate-code', 
      label: 'Generate Code', 
      shortLabel: 'Generate',
      icon: 'code-2', 
      color: 'bg-purple-500' 
    },
    { 
      id: 'test-api', 
      label: 'Test API', 
      shortLabel: 'API',
      icon: 'zap', 
      color: 'bg-green-500' 
    },
    { 
      id: 'new-project', 
      label: 'New Project', 
      shortLabel: 'Project',
      icon: 'plus', 
      color: 'bg-blue-500' 
    },
    { 
      id: 'run-container', 
      label: 'Run Container', 
      shortLabel: 'Docker',
      icon: 'play', 
      color: 'bg-cyan-500' 
    },
    { 
      id: 'create-mr', 
      label: 'Create MR', 
      shortLabel: 'MR',
      icon: 'git-pull-request', 
      color: 'bg-orange-500' 
    },
    { 
      id: 'query-db', 
      label: 'Query DB', 
      shortLabel: 'Query',
      icon: 'database', 
      color: 'bg-pink-500' 
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

  shouldHideLabel(): boolean {
    return this.containerSize === 'compact';
  }

  onActionClick(actionId: string) {
    this.actionClick.emit(actionId);
  }
}