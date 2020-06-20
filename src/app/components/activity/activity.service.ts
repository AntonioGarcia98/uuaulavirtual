import { Injectable } from '@angular/core';
import { ServiceBase } from '../../services/base.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from './activity.model';


@Injectable({
  providedIn: 'root'
})
export class ActivityService extends ServiceBase<Activity> {
 
  url : string = environment.server + 'activity';

  constructor(
      protected http : HttpClient
  ) { 
      super(Activity)
  }

}
