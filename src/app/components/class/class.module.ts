import { NgModule } from '@angular/core';

import { ClassComponent } from './class.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
    { path: '', component: ClassComponent }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatCardModule,
        MatButtonModule,
    ],
    exports: [RouterModule],
    declarations: [ClassComponent],
    providers: [],
})
export class ClassModule { }
