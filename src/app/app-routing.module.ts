import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    /* canActivate: [AuthGuard], */
    /* data: {} */
  },
  {
    path: 'group',
    loadChildren: () => import('./components/group/group.module').then(m => m.GroupModule),
    /* canActivate: [AuthGuard], */
    /* data: {sessionRequired  : true} */
  },
  {
    path: 'class/:id',
    loadChildren: () => import('./components/class/class.module').then(m => { return m.ClassModule}),
    /* canActivate: [AuthGuard], */
    /* data: {sessionRequired  : true} */
  },
  {
    path: 'course/:id',
    loadChildren: () => import('./components/course/course.module').then(m => m.CourseModule),
    /* canActivate: [AuthGuard], */
    /* data: {sessionRequired  : true} */
  },
   /*{
    path: 'activity/:id',
    loadChildren: () => import('./components/activity/activity.module').then(m =>{ 
      console.log(m)
      m.ActivityModule}),
  }, */

  {
    path: 'new-class',
    loadChildren: () => import('./components/new-class/new-class.module').then(m => m.NewClassModule),
    /* canActivate: [AuthGuard], */
    /* data: {sessionRequired  : true} */
  },
  {
    path: 'new-group',
    loadChildren: () => import('./components/new-group/new-group.module').then(m => m.NewGroupModule),
    /* canActivate: [AuthGuard], */
    /* data: {sessionRequired  : true} */
   },
   {
    path: 'edit-group/:id',
    loadChildren: () => import('./components/edit-group/edit-group.module').then(m => m.EditGroupModule),
    /* canActivate: [AuthGuard], */
    /* data: {sessionRequired  : true} */
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