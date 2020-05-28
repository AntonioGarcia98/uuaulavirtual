import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { S2FormGroupModel } from '../../models/s2-form-group.model';
import { S2ButtonModel } from '../../models/s2-button.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { SithecSuiteService } from '../../sithec-suite.service';

@Component({
  selector: 's2-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css']
})
export class FormGeneratorComponent implements OnInit {

  spinner:boolean;

  @Input() S2FormGroup:FormGroup;
  @Input() groups:S2FormGroupModel[];
  @Input() translate:any;
  @Input() button:S2ButtonModel;
  @Input() idForm:string;
  
  @Output() onKeyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickFormButton: EventEmitter<any> = new EventEmitter<any>();

  @Input() sending:boolean = false;

  constructor(
    private sithecSuiteService_tools:SithecSuiteService
  ) { }

  ngOnInit() {
    this.sithecSuiteService_tools.fnSetFatherReference(this.idForm,this);
  }

  ngOnDestroy(){
    this.sithecSuiteService_tools.fnRemoveFatherReference(this.idForm);
    this.sithecSuiteService_tools.fnRemoveComponentsForm(this.idForm);
  }

  fnOnSpinner(){
    this.spinner = true;
  }

  fnOffSpinner(){

    this.spinner = false;
  }

  fnKeyup(event): void {
    this.fnUpdateFormValidations();
    this.onKeyup.emit(event);
  }

  fnChange(event): void {
    this.fnUpdateFormValidations();
    this.onChange.emit(event);
  }

  fnUpdateFormValidations(){
    Object.keys(this.S2FormGroup.controls).forEach(key=>{
      this.S2FormGroup.get(key).updateValueAndValidity();
    });
  }

  fnSubmit(){
    this.sending = true;
    let event:any = {
      data: this.fnCreateObj(),
      fnOffSpinner: (success)=>{
        this.sending = false;
        if(this.button._resetOnSuccess && success){
          this.S2FormGroup.reset();
          this.S2FormGroup.markAsUntouched();
        }
      }
    }
    this.onSubmit.emit(event);
  }

  fnGetValue(){
    return this.fnCreateObj();
  }

  fnCreateObj():any{
    let data = {};
    this.groups.forEach(group=>{
      data[group._nameAs] = this.fnCreateGroup(group);
    });
    return data
  }
  
  fnCreateGroup(group:S2FormGroupModel):any{
    let data:any = {};
    group._items.forEach(item=>{
      if(item._config._type == 'button'){

      }else if(item._config._type == 'group'){
        data[item._config._group._nameAs] = this.fnCreateGroup(item._config._group);
      }else{
        data[(item._renameAs)?(item._renameAs):(item._control)] = this.S2FormGroup.get(item._control).value;
      }
    });
    return data;
  }

  fnGetButtonText(): Observable<string> {
    
    
    let $button: BehaviorSubject<string> = new BehaviorSubject<string>('Button');
    if (this.button._text) {
      if(this.translate){
        this.fnTranslate(this.button._text,$button);
      }else{
        $button.next(this.button._text);
      }
    }
    return $button.asObservable();
  }

  fnTranslate(translate:string = 'no-data',$obs:BehaviorSubject<string>){
    this.translate.get(translate).subscribe(data=>{
      $obs.next(data);
    });
  }

  fnOnClick(event){
    
    event.data = this.fnCreateObj();
    this.onClickFormButton.emit(event);
  }

}
