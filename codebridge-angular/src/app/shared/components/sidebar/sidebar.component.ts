import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

interface NavigationItem {
  name: string;
  route: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() containerSize: 'compact' | 'medium' | 'normal' = 'normal';
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<string>();

  activeRoute = '/dashboard';

  navigation: NavigationItem[] = [
    { name: 'Dashboard', route: '/dashboard', icon: 'layout-dashboard', color: 'text-blue-400' },
    { name: 'CodeBridge', route: '/code-bridge', icon: 'code-2', color: 'text-purple-400' },
    { name: 'API Testing', route: '/api-testing', icon: 'zap', color: 'text-green-400' },
    { name: 'GitLab', route: '/gitlab', icon: 'git-branch', color: 'text-orange-400' },
    { name: 'Docker', route: '/docker', icon: 'container', color: 'text-cyan-400' },
    { name: 'Servers', route: '/servers', icon: 'server', color: 'text-purple-400' },
    { name: 'AI-DB', route: '/ai-db', icon: 'database', color: 'text-pink-400' }
  ];

  bottomNavigation: NavigationItem[] = [
    { name: 'Team', route: '/team', icon: 'users', color: 'text-gray-400' },
    { name: 'Activity', route: '/activity', icon: 'activity', color: 'text-gray-400' },
    { name: 'Settings', route: '/settings', icon: 'settings', color: 'text-gray-400' }
  ];

  constructor(private router: Router) {}

  onToggle() {
    this.toggleSidebar.emit();
  }

  navigateTo(route: string) {
    this.activeRoute = route;
    this.router.navigate([route]);
    this.menuItemClick.emit(route);
  }
}