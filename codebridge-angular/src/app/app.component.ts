import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CodeBridge';
  sidebarCollapsed = false;
  isFullscreen = false;
  containerSize: 'compact' | 'medium' | 'normal' = 'normal';

  ngOnInit() {
    this.detectContainerSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectContainerSize();
  }

  detectContainerSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (width < 768 || height < 600) {
      this.containerSize = 'compact';
      this.sidebarCollapsed = true;
    } else if (width < 1024) {
      this.containerSize = 'medium';
    } else {
      this.containerSize = 'normal';
    }
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.isFullscreen = true;
    } else {
      document.exitFullscreen();
      this.isFullscreen = false;
    }
  }

  onMenuItemClick(route: string) {
    // Handle navigation
    console.log('Navigate to:', route);
  }
}