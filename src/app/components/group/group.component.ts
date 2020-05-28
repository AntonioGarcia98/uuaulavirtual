import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { S2TableFormModel } from 'src/app/form-component/models/s2-table-form.model';
import { HeadersFormModel } from 'src/app/form-component/models/s2-headers-form.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  group =[{
    _foto:"data:image/png;base64,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",
    _nombre:"Grupo A",
    _cuerpo:" Ingeniera en Sistemas Octavo semestre grupo A",
    _id:1,
  },
  {
    _foto:"data:image/png;base64,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",
    _nombre:"Grupo B",
    _cuerpo:" Ingeniera en Sistemas Octavo semestre grupo B",
    _id:2,
  },
  {
    _foto:"data:image/png;base64,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",
    _nombre:"Grupo C",
    _cuerpo:" Ingeniera en Sistemas Octavo semestre grupo C",
    _id:3,
  }
]
  constructor(
    private router: Router
  ) { 
    console.log('group')
  }

  ngOnInit(): void {
  }

  seleccionGrupo(grupo: any){
    console.log(grupo)
    this.router.navigate([ '/class', grupo._id  ]);
  }


  

  /*formulario*/

  
  headersTable = [
    {
      _title: "Numero de folio",
      _columName: "_idVenta",
      _filter: false
    } as HeadersFormModel,
    {
      _title: "Numero ",
      _columName: "_nombre",
      _filter: true
    } as HeadersFormModel,
 ]
  

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

  formGroup_newUserType: FormGroup = new FormGroup({
    _nombre: new FormControl(null, Validators.required),
    _idVenta:new FormControl(null, Validators.required),
    _descripcion: new FormControl(null, Validators.required),
  
  });

  settings_form = {
    _formGroup: this.formGroup_newUserType,
    _id: 'form-new-usertype',
    _groups: [
      {
        _nameAs: 'user-type',
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
            _control: '_descripcion',
            _config: {
              _id: '_descripcion',
              _type: 'text',
              _input: {
                _label: 'Descripcion',
                _placeholder: 'Ingresa una descripcion',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _control: '_idVenta',
            _config: {
              _id: "table",
              _type: "table",
              _table: {
                _enableFilters: false,
                _checkbox: true,
                _checkboxHeader: true,
                _label:"Hola",
               // _limit: 1,
                _primaryKey: '_idVenta',
                _options: this.arrayAux,
                _tableHeaders: this.headersTable,
                _columns: this.inputColumns,
               
              } as S2TableFormModel
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

 


  
  fnOnSend(event) {
    console.log(event)
  }
  

}
