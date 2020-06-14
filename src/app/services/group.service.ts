import { Injectable } from '@angular/core';
import { GroupModel } from '../components/group/group.model';
import { ServiceBase } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GroupService extends ServiceBase<GroupModel>  {

  url : string = environment.server + 'group';

  constructor(
      protected http : HttpClient
  ) { 
      super(GroupModel)
  }
}