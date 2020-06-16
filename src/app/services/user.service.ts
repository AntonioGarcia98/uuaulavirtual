import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceBase } from './base.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService extends ServiceBase<User> {
    
    url : string = environment.server + 'user';

    constructor(
        protected http : HttpClient
    ) { 
        super(User);
    }

    getStudents()
    {
        return this.http.get(this.url + "/filter/student")
    }

    getTeachers() : Observable<any>
    {
        return this.http.get(this.url + "/filter/teacher")
    }

    getStudentsByIdSchool(id:any)
    {
        return this.http.get(environment.server + 'students/school/'+id)
    }

    getTeachersByIdSchool(id:any) : Observable<any>
    {
        return this.http.get(environment.server + 'teachers/school/'+id)
    }
    
}