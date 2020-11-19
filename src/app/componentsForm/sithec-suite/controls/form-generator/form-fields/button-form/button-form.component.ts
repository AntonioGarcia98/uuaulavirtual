import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 's2-button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.css']
})
export class ButtonFormComponent implements OnInit {

  @Input() text: string;
  @Input() class: string;
  @Input() id: string;
  @Output() onClick:EventEmitter<any> = new EventEmitter<any>();
  @Input() translate:any;

  @Input() sending:boolean;

  bln_sending:boolean = false;

  constructor() { }

  ngOnInit() {

  }

  fnClickButton():void{
   
    if(this.sending){
      return;
    }
    this.bln_sending = true;
    this.onClick.emit(
      {
        id:this.id,
        data:null,
        fnOffSpinner: ()=>{
          this.bln_sending = false;
        }
      }
    );
  }

  fnGetInputLabel(): Observable<string> {
    let $label: BehaviorSubject<string> = new BehaviorSubject<string>('Label');
    if (this.text) {
      if(this.translate){
        this.fnTranslate(this.text,$label);
      }else{
        $label.next(this.text);
      }
    }
    return $label.asObservable();
  }

  fnTranslate(translate:string = 'no-data',$obs:BehaviorSubject<string>){
    this.translate.get(translate).subscribe(data=>{
      $obs.next(data);
    });
  }



}
