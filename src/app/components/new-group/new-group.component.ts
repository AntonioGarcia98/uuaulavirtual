import { Component, OnInit } from '@angular/core';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2TableFormModel } from 'src/app/form-component/models/s2-table-form.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { S2SelectFormModel } from 'src/app/form-component/models/s2-select-form.model';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  arrayAux = [
    {
   _idVenta:1,
   _nombre:"hola"
  },
  {
   _idVenta:2,
   _nombre:"hola"
  },
 ]
 
  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

  formGroup_newGroup: FormGroup = new FormGroup({
    _nombre: new FormControl(null, Validators.required),
    _scholarship:new FormControl(null, Validators.required),
    _grade: new FormControl(null, Validators.required),
    _school: new FormControl(null,Validators.required)
  
  });

  settings_form = {
    _formGroup: this.formGroup_newGroup,
  
    _id: 'form-new-usertype',
    _groups: [
      {
        _nameAs: 'new-group',
        _items: [
          {
            _control: '_nombre',
            _config: {
              _id: '_nombre',
              _type: 'text',
              _input: {
                _label: 'Nombre',
                _placeholder: 'Ingresa un nombre',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _control: '_scholarship',
            _config: {
              _id: 'Escolaridad',
              _type: 'text',
              _input: {
                _label: 'Ecolaridad',
                _placeholder: 'Ingresa una escolaridad',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _control: '_grade',
            _config: {
              _id: 'Grado',
              _type: 'text',
              _input: {
                _label: 'Grado',
                _placeholder: 'Ingresa un grado',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _control: "_school",
            _config: {
              _id: "School",
              _type: "select",
              _select: {
                _options: this.arrayAux,
                _optionKey: '_nombre',
                _valueKey: '_idVenta',
                _label: 'Escuela',
                _columns: this.inputColumns

              } as S2SelectFormModel
            } as S2FormField
          } as S2FormGroupItemModel,
        
          
        ],

      } as S2FormGroupModel,
     
      
    ],
    
    _saveButton: {
      _text: 'Guardar',
      _resetOnSuccess: true,
      _validToSend: true
    } as S2ButtonModel
  } as S2SettingsFormGeneratorModel


  fnOnSend(event):void{
    console.log(event)
  }
 


  




}
