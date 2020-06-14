import { Component, OnInit } from '@angular/core';
import { HeadersFormModel } from 'src/app/form-component/models/s2-headers-form.model';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2TableFormModel } from 'src/app/form-component/models/s2-table-form.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.css']
})
export class NewClassComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }


  /*formulario*/

  headersTable = [
    {
      _title: "Numero",
      _columName: "_idUsuario",
      _filter: false
    } as HeadersFormModel,
    {
      _title: "Nombre de usuario ",
      _columName: "_user_name",
      _filter: true
    } as HeadersFormModel,
    {
      _title: "Nombre",
      _columName: "_name",
      _filter: false
    } as HeadersFormModel,
    {
      _title: "Apellido",
      _columName: "_last_name",
      _filter: false
    } as HeadersFormModel,
  ]


  arrayAux = [
    {
      _idUsuario: 1,
      _user_name: "Apellido",
      _name: "hola",
      _last_name: "Apellido"
    },
    {
      _idUsuario: 2,
      _user_name: "Apellido",
      _name: "hola",
      _last_name: "Apellido"
    },
  ]


  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

  formGroup_newClass: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    teachers: new FormControl(null, Validators.required),
    students: new FormControl(null, Validators.required),
   // group: new FormControl(null,)user

  });



  settings_form = {
    _formGroup: this.formGroup_newClass,
    _id: 'form-new-usertype',
    _groups: [
      {
        _nameAs: 'new-class',
        _items: [
          {
            _control: 'name',
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
            _control: 'teachers',
            _config: {
              _id: "table",
              _type: "table",
              _table: {
                _enableFilters: true,
                _checkbox: true,
                _checkboxHeader: true,
                _label: "Grupos",
                _limit: 1,
                _primaryKey: '_idUsuario',
                _options: this.arrayAux,
                _tableHeaders: this.headersTable,
                _columns: this.inputColumns,

              } as S2TableFormModel
            } as S2FormField
          } as S2FormGroupItemModel,

          {
            _control: 'students',
            _config: {
              _id: "table",
              _type: "table",
              _table: {
                _enableFilters: true,
                _checkbox: true,
                _checkboxHeader: true,
                _label: "Alumnos",
                //_limit: 1,
                _primaryKey: '_idUsuario',
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


  getUsers(): void {
    this.userService.getAll().toPromise()
      .then((res) => {
        console.log(res)
        console.log('done');

      })
      .catch((err) => {
        console.log(err)
      })
  }


  fnOnSend(event) {
    console.log(event)
  }


}
