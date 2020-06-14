import { NgModule } from '@angular/core';

import { CourseComponent } from './course.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { SithecSuiteModule } from 'src/app/form-component/sithec-tools-suite.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivityComponent } from '../activity/activity.component';

const routes: Routes = [
    { path: '', component: CourseComponent }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatCardModule,
        MatButtonModule,
        SithecSuiteModule,
        MatExpansionModule,
        MatDialogModule,
        MatIconModule
    ],
    exports: [RouterModule],
    declarations: [CourseComponent,ActivityComponent],
    providers: [],
})
export class CourseModule { }
