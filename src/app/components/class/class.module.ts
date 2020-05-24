import { NgModule } from '@angular/core';

import { ClassComponent } from './class.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
    { path: '', component: ClassComponent }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatCardModule
    ],
    exports: [RouterModule],
    declarations: [ClassComponent],
    providers: [],
})
export class ClassModule { }
