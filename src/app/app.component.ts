import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeadersFormModel } from './form-component/models/s2-headers-form.model';
import { S2BootstrapColumnsModel } from './form-component/models/s2-bootstrap-columns.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { S2InputForm } from './form-component/models/s2-input-form.model';
import { S2FormField } from './form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from './form-component/models/s2-form-group-item.model';
import { S2TableFormModel } from './form-component/models/s2-table-form.model';
import { S2FormGroupModel } from './form-component/models/s2-form-group.model';
import { S2ButtonModel } from './form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from './form-component/models/s2-settings-form-generator.model';
import { CollapseTableComponent } from './form-component/sithec-tools-suite.component';
import { async } from '@angular/core/testing';
import { SithecConfig } from './components/form-dialog/sithec.config.model';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uuaulavirtual';

  constructor(
    private dialog : MatDialog
  ) {
  }
  
  //Login params


  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

  formGroup_newUserType: FormGroup = new FormGroup({
    _nombre: new FormControl(null, Validators.required),
    _idVenta:new FormControl(null, Validators.required),
    _descripcion: new FormControl(null, Validators.required),
  
  });

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

  /* settings_form = {
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
    
        ],

      } as S2FormGroupModel,
     
      
    ],
    
    _saveButton: {
      _text: 'Guardar',
      _resetOnSuccess: true,
      _validToSend: true
    } as S2ButtonModel
  } as S2SettingsFormGeneratorModel */

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

  async login()
  {
    var config : SithecConfig = new SithecConfig()
    config.settings = this.settings_form;
    config.tool = 'form-generator';
    config.fnOnSubmit = this.fnOnSend
    
    this.dialog.open(FormDialogComponent, { data : config})
  }
  
}
