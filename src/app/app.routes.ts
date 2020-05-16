import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GroupComponent } from './components/group/group.component';
import { ClassComponent } from './components/class/class.component';
import { CourseComponent } from './components/course/course.component';




export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
   { path: 'login', component: LoginComponent },
   { path: 'group', component: GroupComponent },
   { path: 'class/:id', component: ClassComponent },
   { path: 'course/:id', component: CourseComponent },
    /*{ path: 'artist/:id', component: ArtistaComponent },*/
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

