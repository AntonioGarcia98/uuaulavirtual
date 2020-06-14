import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceBase } from './base.service';
import { Teacher} from '../models/user.model';

@Injectable()
export class TeacherService extends ServiceBase<Teacher> {
    
    url : string = environment.server + 'teacher';

    constructor(
        protected http : HttpClient
    ) { 
        super(Teacher);
    }
    
}