import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { isObservable } from "rxjs";
import { SithecSuiteService } from '../../../../sithec-suite.service';

@Component({
  selector: 's2-form-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() S2FormControl:FormControl;
  @Input() S2FormGroup:FormGroup;
  @Input() options:any[]|Observable<any[]>;
  @Input() label:string = 'label';
  @Input() id:string = 'default-id';
  @Input() idForm:string = 'default-idForm';
  @Input() colum:string = '6';
  @Input() valueKey:string = 'none';
  @Input() optionKey:string = 'none';

  @Input() sending:boolean;

  @Input() translate:any;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();


  _selectOptions:Observable<any[]>  

  constructor(
    private sithecSuiteService_tools:SithecSuiteService
  ) { }

  ngOnInit() {
    this.sithecSuiteService_tools.fnSetComponmentsForm(this.idForm,this.id,this);
    this.fnInitOptions();
  }

  fnInitOptions(){
    if(isObservable(this.options)){
      this._selectOptions = this.options;
    }else{
      let $columns:BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.options);
      this._selectOptions = $columns.asObservable();
    }
  }

  fnReloadOptions(options:any[]|Observable<any[]>,defaultValue:any):void{
    this.options = options;
    this.S2FormControl.setValue(defaultValue);
    this.fnInitOptions();
  }

  fnChange(event):void{
    let emitEvent = {id:this.id,event:event};
    this.onChange.emit(emitEvent)
  }

  fnGetInputLabel(): Observable<string> {
    let $label: BehaviorSubject<string> = new BehaviorSubject<string>('Label');
    if (this.label) {
      if(this.translate){
        this.fnTranslate(this.label,$label);
      }else{
        $label.next(this.label);
      }
    }
    return $label.asObservable();
  }

  fnTranslate(translate:string = 'no-data',$obs:BehaviorSubject<string>){
    this.translate.get(translate).subscribe(data=>{
      $obs.next(data);
    });
  }

  fnGetValue():string{
    let option = 'not found';
    this._selectOptions.source['value'].forEach(element => {
      if(element[this.valueKey] == this.S2FormControl.value){
        option = element[this.optionKey];
      }
    });
    return option;
  }

  fnSetValue(value){
    this.S2FormControl.setValue(value)
  }

}
