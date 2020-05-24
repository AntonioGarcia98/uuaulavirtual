import { NgModule } from '@angular/core';

import { CourseComponent } from './course.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
    { path: '', component: CourseComponent }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatCardModule
    ],
    exports: [RouterModule],
    declarations: [CourseComponent],
    providers: [],
})
export class CourseModule { }
