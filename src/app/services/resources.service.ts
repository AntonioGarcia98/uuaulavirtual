import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService  {

  url : string = environment.server + 'resource';

  constructor(
      protected http : HttpClient
  ) { 
      
  }





}
