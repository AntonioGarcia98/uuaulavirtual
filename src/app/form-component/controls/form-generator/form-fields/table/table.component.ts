import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { isObservable } from "rxjs";
import { SithecSuiteService } from '../../../../sithec-suite.service';
import { HeadersFormModel } from '../../../../models/s2-headers-form.model';
import { S2IconButtonModel } from '../../../../models/s2-icon-button.model';

@Component({
  selector: 's2-form-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableFormComponent implements OnInit {

  @Input() S2FormControl: FormControl;
  @Input() S2FormGroup: FormGroup;
  @Input() options: any[] | Observable<any[]>;
  @Input() label: string = 'label';
  @Input() id: string = 'default-id';
  @Input() idForm: string = 'default-idForm';
  @Input() colum: string = '6';
  @Input() valueKey: string = 'none';
  @Input() optionKey: string = 'none';
  @Input() headers: HeadersFormModel[] = [];
  @Input() checkbox: boolean;
  @Input() checkboxHeader: boolean;
  @Input() enableFilters: boolean;
  @Input() collapse: boolean;
  @Input() limit: number;
  @Input() primaryKey: string;
  @Input() buttons:S2IconButtonModel[]

  @Input() sending: boolean;

  @Input() translate: any;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickButton: EventEmitter<any> = new EventEmitter<any>();

  _tableOptions: Observable<any[]>;

  any_selected: any = {};
  array_selectedOptions: any[] = [];

  itemsPerPage: number = 5;

  constructor(
    private sithecSuiteService_tools: SithecSuiteService
  ) { }

  ngOnInit() {
    this.sithecSuiteService_tools.fnSetComponmentsForm(this.idForm, this.id, this);
    this.fnInitOptions();
    if (this.collapse) {
      this.bln_collapse = true;
    }
  }

  fnUnselectAll(){
    this.any_selected = {};
      this.array_selectedOptions = [];
  }

  fnGetRows():any[]{
    return this._tableOptions.source['_value'];
  }

  fnSetOptions(options: any[] | Observable<any[]>): void {
    this.options = options;
    this.array_selectedOptions = [];
    this.any_selected = {};
    this.fnInitOptions();
  }

  fnInitOptions() {
    if (isObservable(this.options)) {
      this._tableOptions = this.options;
    } else {
      let $columns: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.options);
      this._tableOptions = $columns.asObservable();
    }
  }

  fnGetInputHeader(header: HeadersFormModel): Observable<string> {
    let $header: BehaviorSubject<string> = new BehaviorSubject<string>('Title');
    if (header._title) {
      if (this.translate) {
        this.fnTranslate(header._title, $header);
      } else {
        $header.next(header._title);
      }
    }
    return $header.asObservable();
  }

  fnGetInputLabel(): Observable<string> {
    let $label: BehaviorSubject<string> = new BehaviorSubject<string>('');
    if (this.label) {
      if (this.translate) {
        this.fnTranslate(this.label, $label);
      } else {
        $label.next(this.label);
      }
    }
    return $label.asObservable();
  }

  fnTranslate(translate: string = 'no-data', $obs: BehaviorSubject<string>) {
    this.translate.get(translate).subscribe(data => {
      $obs.next(data);
    });
  }

  fnSelectRow(row: any, emmit: boolean = true) {
    if (this.sending) {
      return;
    }
    let event: any = {}
    if (this.any_selected[row[this.primaryKey]]) {
      event.id = this.id;
      event.disable = this.fnPopSelectedRow(row[this.primaryKey]);
    } else {
      if (this.limit) {

        if ((this.limit - 1) < this.array_selectedOptions.length) {

          let id = this.array_selectedOptions[0][this.primaryKey];
          event.disable = this.fnPopSelectedRow(id);
        }
      }
      event.enable = row;
      event.id = this.id;
      this.any_selected[row[this.primaryKey]] = true;
      this.array_selectedOptions.push(row);
    }
    if (this._tableOptions.source["_value"].length == Object.keys(this.array_selectedOptions).length) {
      this.bln_allSelected = true;
      this.bln_allFilterSelected = true;
    }else{
      this.bln_allSelected = false;
      this.bln_allFilterSelected = false;
    }
    this.S2FormControl.setValue(this.array_selectedOptions.length > 0 ? this.array_selectedOptions : null);
    if (emmit) {
      event.data = (this.S2FormControl.value)?(this.S2FormControl.value):[];
      this.onChange.emit(event);
    }

  }

  fnPopSelectedRow(id): void {
    let popRow: any = null;
    delete this.any_selected[id];
    let deleteIndex: number = -1;
    for (let index = 0; index < this.array_selectedOptions.length; index++) {
      if (parseInt('' + this.array_selectedOptions[index][this.primaryKey]) == parseInt('' + id)) {

        deleteIndex = index;
      }
    }
    if (deleteIndex != -1) {
      popRow = this.array_selectedOptions.splice(deleteIndex, 1);
    }
    return popRow;
  }

  fnResetData(): void {
    this.S2FormControl.setValue(null);
    this.any_selected = {};
    this.array_selectedOptions = [];
    this.S2FormControl.markAsUntouched();
  }

  bln_showSpinner: boolean;
  fnOnSpinner(): void {
    this.bln_showSpinner = true;
  }

  fnOffSpinner(): void {
    this.bln_showSpinner = false;
  }

  actual_page: number = 1;
  //sufrio un cambio respecto a la original
  fnSetValue(values: any[], key: string, count: number=0): void {
    let data: any[] = this._tableOptions.source['_value'];
    console.log(data);
    if (data.length == 0 && count < 10) {
      count++;
      setTimeout(() => {
        this.fnSetValue(values, key, count);
      }, 1000);
      return;
    } else if (data.length == 0 && count > 10) {
      return;
    }
    data.forEach(element => {
      for (let index = 0; index < values.length; index++) {
        if (element[key] == values[index][key]) {
          this.fnSelectRow(element);
        }

      }
    })
  }

  bln_collapse: boolean = false;
  fnCollapseTable(): void {
    this.bln_collapse = !this.bln_collapse;
  }

  bln_allSelected: boolean;
  fnCheckAll(bln_checkAll: boolean): void {
    if (this.sending) {
      return;
    }
    let rows: any[] = this._tableOptions.source["_value"];
    rows.forEach(row => {
      if (bln_checkAll) {
        if (!this.any_selected[row[this.primaryKey]]) {
          this.fnSelectRow(row, false);
        }
      } else {
        if (this.any_selected[row[this.primaryKey]]) {
          this.fnSelectRow(row, false);
        }
      }
    });
    this.bln_allFilterSelected = bln_checkAll;
    //this.bln_allSelected = bln_checkAll;

    let event: any = {};
    event.enable = this.bln_allSelected ? rows : null;
    event.disable = this.bln_allSelected ? null : rows;
    event.id = this.id;
    event.data = (this.S2FormControl.value)?(this.S2FormControl.value):[];
    this.onChange.emit(event);
  }

  bln_allFilterSelected:boolean;
  fnSelectAllFilterRows(bln_checkAll: boolean): void {
    if (this.sending) {
      return;
    }
    let rows: any[] = this._tableOptions.source["_value"];
    rows.forEach(row => {
      let mark: boolean = this.fnIsInFilter(row);
      if(mark){
        if (bln_checkAll) {
          if (!this.any_selected[row[this.primaryKey]]) {
            this.fnSelectRow(row, false);
          }
        } else {
          if (this.any_selected[row[this.primaryKey]]) {
            this.fnSelectRow(row, false);
          }
        }
      }
    });
    this.bln_allFilterSelected = bln_checkAll;
    let event: any = {};
    event.enable = this.bln_allSelected ? rows : null;
    event.disable = this.bln_allSelected ? null : rows;
    event.id = this.id;
    event.data = (this.S2FormControl.value)?(this.S2FormControl.value):[];
    this.onChange.emit(event);
  }

  fnIsInFilter(row: any): boolean {
    let valid: boolean = true;
    this.headers.forEach(data => {
      if (data._filter) {
        let input: string = (data._filterValue) ? (data._filterValue) : '';
        input = input.toUpperCase();
        input = input.split("Á").join("A");
        input = input.split("É").join("E");
        input = input.split("Í").join("I");
        input = input.split("Ó").join("O");
        input = input.split("Ú").join("U");

        let value: string = (row[data._columName]) ? (row[data._columName]) : '';
        value = value.toUpperCase();
        value = value.split("Á").join("A");
        value = value.split("É").join("E");
        value = value.split("Í").join("I");
        value = value.split("Ó").join("O");
        value = value.split("Ú").join("U");

        if(input != ''){
          if(value.indexOf(input)==-1){
            valid = false;
          }
        }
      }
    });
    return valid;
  }

  fnKeyupFilter():void{
    let valid:boolean = true;
    let rows: any[] = this._tableOptions.source["_value"];
    rows.forEach(row => {
      let mark = this.fnIsInFilter(row);
      if(mark){
        if (!this.any_selected[row[this.primaryKey]]) {
          valid = false;
        }
      }
    });
    this.bln_allFilterSelected = valid;
  }

  fnEmitIconButton(icon:S2IconButtonModel,row:any,i:number){
    let event = {
      row: row,
      id:icon._id,
      numero: i,
      fnPopRow: ()=>{
        let data:any[] = this._tableOptions.source['value'] || [];
        data.splice(i,1);
      }
    }
    this.onClickButton.emit(event)
    
   
  }

}
