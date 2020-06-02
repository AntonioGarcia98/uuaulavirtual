import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SithecConfig } from 'src/app/components/form-dialog/sithec.config.model';

@Component({
    selector: 'form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

    settings: any;
    tool: string;

    fnOnClickButton = null;
    fnOnOpenTableChange = null; 
    fnOnClickInitFilter = null; 
    fnOnClickFormButton = null; 

    fnOnKeyup = null; 
    fnOnSubmit = null; 
    fnOnChange = null; 

    fnOnClickSavebutton = null; 

    info

    constructor(
        @Inject(MAT_DIALOG_DATA)  public data : SithecConfig,
        public dialogRef: MatDialogRef<FormDialogComponent>
    ) { 
        this.info = data;
        Object.keys(data).map(k => {
            this[k] = data[k];
        })

        console.log(data);
    }

    ngOnInit(): void { 
    }
}
