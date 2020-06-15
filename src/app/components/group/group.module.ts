import { NgModule } from '@angular/core';

import { GroupComponent } from './group.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SithecSuiteModule } from 'src/app/form-component/sithec-tools-suite.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
    { path: '', component: GroupComponent }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatCardModule,
        MatButtonModule,
        SithecSuiteModule,
        MatIconModule,
        MatDialogModule
    ],
    exports: [RouterModule],
    declarations: [GroupComponent],
    providers: [],
})
export class GroupModule { }
