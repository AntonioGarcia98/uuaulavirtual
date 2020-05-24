import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule { }
