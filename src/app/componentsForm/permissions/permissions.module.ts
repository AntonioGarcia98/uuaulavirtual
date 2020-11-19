import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsControlComponent } from './permissions-control/permissions-control.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PermissionsControlComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PermissionsControlComponent
  ]
})
export class PermissionsModule { }
