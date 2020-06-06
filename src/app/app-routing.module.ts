import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
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
    path: 'class/:id',
    loadChildren: () => import('./components/class/class.module').then(m => {
      return m.ClassModule
    }),
  },
  {
    path: 'course/:id',
    loadChildren: () => import('./components/course/course.module').then(m => m.CourseModule),
  },
  {
    path: 'activity/:id',
    loadChildren: () => import('./components/activity/activity.module').then(m => m.ActivityModule),
  },

  {
    path: 'new-class',
    loadChildren: () => import('./components/new-class/new-class.module').then(m => m.NewClassModule),
  },
  {
    path: 'new-group',
    loadChildren: () => import('./components/new-group/new-group.module').then(m => m.NewGroupModule),
   },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 /*{
 path: 'new-group',
 loadChildren: () => import('./components/new-group/new-group.module').then(m => m.NewGroupModule),
},
{
 path: 'new-class',
 loadChildren: () => import('./components/new-class/new-class.module').then(m => m.NewClassModule),
}, /*fin admin grupo*/
