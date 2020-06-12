import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageConfig } from './message-dialog.model';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA)  public data : MessageConfig,
      public dialogRef: MatDialogRef<MessageDialogComponent>
  ) { 
      //Disable close on click outside of the dialog
      this.dialogRef.disableClose = true;

      console.log(data);
  }

  ngOnInit(): void {}

  closeDialog = () => this.dialogRef.close();

}
