import { Injectable } from '@angular/core';
import { DeliveryModel } from '../components/activity/delivery.model';
import { ServiceBase } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends ServiceBase<DeliveryModel>{
  url : string = environment.server + 'delivery';

  constructor(
      protected http : HttpClient
  ) { 
      super(DeliveryModel)
  }

}
