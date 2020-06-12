import { NgModule } from '@angular/core';

import { ActivityComponent } from './activity.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
    { path: '', component: ActivityComponent }
];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatDialogModule
    ],
    exports: [RouterModule],
    declarations: [ActivityComponent],
    providers: [],
})
export class ActivityModule { }
