import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClassModel } from '../components/class/class.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClassService extends ServiceBase<ClassModel> {

 
  url : string = environment.server + 'room';

  constructor(
      protected http : HttpClient
  ) { 
      super(ClassModel)
  }


  getClassByGroup(id: any) : Observable<any>
  {
    console.log("llegue",id)
      return this.http.get(this.url + "s/group/"+id)
  }

  getActivitiesByClass(id : any) : Observable<any>
  {
    return this.http.get(this.url + "/" + id + "/activities")
  }


  getActivitiesByClassByUser(id : any,idUser: any) : Observable<any>
  {
    return this.http.get(this.url + "s/group/" + id + "/user/"+idUser)
  }
}
