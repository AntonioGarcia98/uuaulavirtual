import { NgModule } from '@angular/core';

import { CourseComponent } from './course.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { SithecSuiteModule } from 'src/app/form-component/sithec-tools-suite.module';

const routes: Routes = [
    { path: '', component: CourseComponent }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatCardModule,
        SithecSuiteModule,
    ],
    exports: [RouterModule],
    declarations: [CourseComponent],
    providers: [],
})
export class CourseModule { }