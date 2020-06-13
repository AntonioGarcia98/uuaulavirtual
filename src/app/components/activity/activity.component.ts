import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityModel } from './activity.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    private router: Router,/* 
    @Inject(MAT_DIALOG_DATA)  public data : ActivityModel,
    public dialogRef: MatDialogRef<ActivityComponent> */
  ) { 
    /* Object.keys(this.data).map(k => {
      this[k] = this.data[k]; 
    }) */
    console.log("data")
  }

  ngOnInit(): void {
  }

  
selectActivity(activity: any){
    console.log(activity)
   this.router.navigate([ '/activity', activity._id  ]);
  }

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
