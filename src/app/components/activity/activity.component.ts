import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from './activity.model';
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
    @Inject(MAT_DIALOG_DATA)  public data : Activity,
    public dialogRef: MatDialogRef<ActivityComponent>
  ) { 
    Object.keys(this.data).map(k => {
      this[k] = this.data[k]; 
    })
  }

  ngOnInit(): void {
  }

  closeDialog(state? : number) { this.dialogRef.close(state) };

}
