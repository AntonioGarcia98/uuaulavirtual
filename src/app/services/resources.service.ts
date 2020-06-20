import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService  {

  url : string = environment.server + 'resource';

  constructor(
      protected http : HttpClient
  ) {}

  createResource(formData : FormData) : Observable<any>
  {
    return this.http.post(this.url, formData);
  }





}
