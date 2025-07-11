import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

// Lucide Icons
import { LucideAngularModule, 
  LayoutDashboard, Code2, Zap, GitBranch, Container, Server, Database,
  Users, Activity, Settings, ChevronLeft, ChevronRight, Maximize2, Minimize2,
  Plus, Play, GitPullRequest, Menu, X
} from 'lucide-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CodeBridgeComponent } from './features/code-bridge/code-bridge.component';
import { QuickActionsComponent } from './shared/components/quick-actions/quick-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    CodeBridgeComponent,
    QuickActionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
    // Angular Material
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    
    // Lucide Icons
    LucideAngularModule.pick({
      LayoutDashboard, Code2, Zap, GitBranch, Container, Server, Database,
      Users, Activity, Settings, ChevronLeft, ChevronRight, Maximize2, Minimize2,
      Plus, Play, GitPullRequest, Menu, X
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }