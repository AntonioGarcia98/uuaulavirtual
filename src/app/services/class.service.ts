import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClassModel } from '../components/class/class.model';


@Injectable({
  providedIn: 'root'
})
export class ClassService extends ServiceBase<ClassModel> {

 
  url : string = environment.server + 'class';

  constructor(
      protected http : HttpClient
  ) { 
      super(ClassModel)
  }
}
