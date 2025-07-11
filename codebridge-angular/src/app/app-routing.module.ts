import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CodeBridgeComponent } from './features/code-bridge/code-bridge.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'code-bridge', component: CodeBridgeComponent },
  { 
    path: 'api-testing', 
    loadChildren: () => import('./features/api-testing/api-testing.module').then(m => m.ApiTestingModule) 
  },
  { 
    path: 'gitlab', 
    loadChildren: () => import('./features/gitlab/gitlab.module').then(m => m.GitlabModule) 
  },
  { 
    path: 'docker', 
    loadChildren: () => import('./features/docker/docker.module').then(m => m.DockerModule) 
  },
  { 
    path: 'servers', 
    loadChildren: () => import('./features/servers/servers.module').then(m => m.ServersModule) 
  },
  { 
    path: 'ai-db', 
    loadChildren: () => import('./features/ai-db/ai-db.module').then(m => m.AiDbModule) 
  },
  { 
    path: 'team', 
    loadChildren: () => import('./features/team/team.module').then(m => m.TeamModule) 
  },
  { 
    path: 'activity', 
    loadChildren: () => import('./features/activity/activity.module').then(m => m.ActivityModule) 
  },
  { 
    path: 'settings', 
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }