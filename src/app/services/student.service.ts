import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceBase } from './base.service';
import { User, Student } from '../models/user.model';

@Injectable()
export class StudentService extends ServiceBase<Student> {
    
    url : string = environment.server + 'student';

    constructor(
        protected http : HttpClient
    ) { 
        super(Student);
    }
    
}