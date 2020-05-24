import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'group',
    loadChildren: () => import('./components/group/group.module').then(m => m.GroupModule),
  },
  {
    path: 'class:id',
    loadChildren: () => import('./components/class/class.module').then(m => m.ClassModule),
  },
  {
    path: 'course:id',
    loadChildren: () => import('./components/course/course.module').then(m => m.CourseModule),
  },
  {
    path: 'activity:id',
    loadChildren: () => import('./components/activity/activity.module').then(m => m.ActivityModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
