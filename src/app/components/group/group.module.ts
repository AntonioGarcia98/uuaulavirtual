import { NgModule } from '@angular/core';

import { GroupComponent } from './group.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
    { path: '', component: GroupComponent }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatCardModule
    ],
    exports: [RouterModule],
    declarations: [GroupComponent],
    providers: [],
})
export class GroupModule { }
