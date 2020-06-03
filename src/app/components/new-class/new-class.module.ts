import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewClassComponent } from './new-class.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SithecSuiteModule } from 'src/app/form-component/sithec-tools-suite.module';


const routes: Routes = [
  { path: '', component: NewClassComponent }
];

@NgModule({
  declarations: [NewClassComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    SithecSuiteModule,

  ],
  exports: [RouterModule],
})
export class NewClassModule { }
