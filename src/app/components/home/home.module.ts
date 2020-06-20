import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SithecSuiteModule } from 'src/app/form-component/sithec-tools-suite.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
const routes: Routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes),
        MatButtonModule,
        SithecSuiteModule,
        MatIconModule,
        MatDialogModule,
        MatProgressSpinnerModule
    
    ],
    exports: [RouterModule],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
