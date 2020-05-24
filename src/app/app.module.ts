import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ROUTES } from './app.routes';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { NavbarComponent } from './components/share/navbar/navbar.component';
import { GroupComponent } from './components/group/group.component';
import { ClassComponent } from './components/class/class.component';
import {MatCardModule} from '@angular/material/card';
import { CourseComponent } from './components/course/course.component';


@NgModule({
  declarations: [
    AppComponent,/* Se declararán solo modulos compartidos de forma global
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    GroupComponent,
    ClassComponent,
    CourseComponent, */
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
