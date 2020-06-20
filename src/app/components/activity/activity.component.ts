import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from './activity.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  title : string = ""

  autor : string = ""

  description : string = ""

  delivery_date : string = ""

  points : number = 0;

  resource : any = null

  constructor(
    @Inject(MAT_DIALOG_DATA)  public data : Activity,
    public dialogRef: MatDialogRef<ActivityComponent>,
    private resourcesService : ResourcesService
  ) { 
    console.log(this.data)
    Object.keys(this.data).map(k => {
      this[k] = this.data[k]; 
    })

    if(this.data.resources && this.data.resources.length > 0)
    {
      this.resourcesService.downloadResource(this.data.resources[0]).toPromise()
      .then((res) => {
        console.log(res)
      })
    }
  }

  ngOnInit(): void {
  }

  closeDialog(state? : number) { this.dialogRef.close(state) };

}
