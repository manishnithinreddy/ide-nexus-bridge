import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { LucideAngularModule, Play, Copy, Download, Plus, Trash2 } from 'lucide-angular';

import { ApiTestingComponent } from './api-testing.component';
import { RequestBuilderComponent } from './components/request-builder/request-builder.component';

@NgModule({
  declarations: [
    ApiTestingComponent,
    RequestBuilderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    LucideAngularModule.pick({ Play, Copy, Download, Plus, Trash2 }),
    RouterModule.forChild([
      { path: '', component: ApiTestingComponent }
    ])
  ]
})
export class ApiTestingModule { }