import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServiceBase } from './base.service';
import { User, Student } from '../models/user.model';
import { School } from '../models/school.model';

@Injectable()
export class SchoolService extends ServiceBase<School> {
    
    url : string = environment.server + 'school';

    constructor(
        protected http : HttpClient
    ) { 
        super(School);
    }
    
}