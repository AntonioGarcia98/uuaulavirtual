import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditGroupComponent } from './edit-group.component';
import { Routes, RouterModule } from '@angular/router';
import { SithecSuiteModule } from 'src/app/form-component/sithec-tools-suite.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

const routes: Routes = [
  { path: '', component: EditGroupComponent }
];

@NgModule({
  declarations: [EditGroupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SithecSuiteModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule

  ]
})
export class EditGroupModule { }
