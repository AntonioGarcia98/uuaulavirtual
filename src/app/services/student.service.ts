import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServiceBase } from './base.service';
import { User, Student } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class StudentService extends ServiceBase<Student> {
    
    url : string = environment.server + 'student';

    constructor(
        protected http : HttpClient
    ) { 
        super(Student);
    }
    
}