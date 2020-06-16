import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-class-participants',
  templateUrl: './class-participants.component.html',
  styleUrls: ['./class-participants.component.css']
})
export class ClassParticipantsComponent implements OnInit {

  title : string = ""

  autor : string = ""

  description : string = ""

  delivery_date : string = ""

  points : number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA)  public data : any,
    public dialogRef: MatDialogRef<ClassParticipantsComponent>
  ) { 


    console.log(this.data.teachers)
  }

  ngOnInit(): void {
  }

  closeDialog(state? : number) { this.dialogRef.close(state) };

}
