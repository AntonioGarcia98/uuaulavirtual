import { NgModule } from '@angular/core';

import { GroupComponent } from './group.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
    { path: '', component: GroupComponent }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatCardModule,
        MatButtonModule
    ],
    exports: [RouterModule],
    declarations: [GroupComponent],
    providers: [],
})
export class GroupModule { }
