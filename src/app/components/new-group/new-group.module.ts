import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGroupComponent } from './new-group.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SithecSuiteModule } from 'src/app/form-component/sithec-tools-suite.module';


const routes: Routes = [
  { path: '', component: NewGroupComponent }
];

@NgModule({
  declarations: [NewGroupComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    SithecSuiteModule,
  ],
  exports: [RouterModule],
})
export class NewGroupModule { }
