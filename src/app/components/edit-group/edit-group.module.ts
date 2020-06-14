import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditGroupComponent } from './edit-group.component';
import { Routes, RouterModule } from '@angular/router';
import { SithecSuiteModule } from 'src/app/form-component/sithec-tools-suite.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


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
  ]
})
export class EditGroupModule { }
