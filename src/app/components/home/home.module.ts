import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
