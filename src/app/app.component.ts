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
    private dialog: MatDialog
  ) {
  }

  fnOnSend(event) {
    console.log(event)
  }

  async createAccount() {

    /*
      Profile
      {
      photo: string, 
        desc : string,
        public : bool
      }
    */

    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var formGroup_newUser: FormGroup = new FormGroup({
      _username: new FormControl(null, Validators.required),
      _name: new FormControl(null, Validators.required),
      _lastName: new FormControl(null, Validators.required),
      _birthdate: new FormControl(null, Validators.required),
      _email : new FormControl(null, Validators.email),
      _phone_number : new FormControl(null, []),
      _password: new FormControl(null, []),
    });

    var config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: formGroup_newUser,
        _id: 'form-new-user',
        _groups: [
          {
            _nameAs: 'user-credentials',
            _items: [
              {
                _control: '_username',
                _config: {
                  _id: '_username',
                  _type: 'text',
                  _input: {
                    _label: 'Usuario',
                    _placeholder: 'Ingresa su nombre de usuario',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: '_name',
                _config: {
                  _id: '_name',
                  _type: 'text',
                  _input: {
                    _label: 'Nombre(s)',
                    _placeholder: 'Ingrese su(s) nombre(s)',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: '_lastName',
                _config: {
                  _id: '_lastName',
                  _type: 'text',
                  _input: {
                    _label: 'Apellido(s)',
                    _placeholder: 'Ingrese su(s) apellido(s)',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: '_birthdate',
                _config: {
                  _id: '_birthdate',
                  _type: 'date',
                  _input: {
                    _label: 'Fecha de Nacimiento',
                    _placeholder: 'Ingrese su fecha de nacimiento',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: '_email',
                _config: {
                  _id: '_email',
                  _type: 'text',
                  _input: {
                    _label: 'Correo Electrónico',
                    _placeholder: 'Ingresa su correo electrónico',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: '_phone_number',
                _config: {
                  _id: '_phone_number',
                  _type: 'number',
                  _input: {
                    _label: 'Telefono(s)',
                    _placeholder: 'Ingrese su(s) telefonos', //Podemos dejarlo como text o number, validar la entrada de puntos o letras, y que separe telefonos por comas
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: '_password',
                _config: {
                  _id: '_password',
                  _type: 'password',
                  _input: {
                    _label: 'Contraseña',
                    _placeholder: 'Ingrese una contraseña segura',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,

            ],
          } as S2FormGroupModel,
        ],

        _saveButton: {
          _text: 'Registrarme',
          _resetOnSuccess: true,
          _validToSend: true
        } as S2ButtonModel
      } as S2SettingsFormGeneratorModel;

    config.tool = 'form-generator';

    config.fnOnSubmit = (event) => { console.log(event) }

    this.dialog.open(FormDialogComponent, { data: config })
  }

  async login() {

    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var formGroup_newUser: FormGroup = new FormGroup({
      _username: new FormControl(null, Validators.required),
      _password: new FormControl(null, Validators.required),
    });

    var config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: formGroup_newUser,
        _id: 'form-new-user',
        _groups: [
          {
            _nameAs: 'user-credentials',
            _items: [
              {
                _control: '_username',
                _config: {
                  _id: '_username',
                  _type: 'text',
                  _input: {
                    _label: 'Usuario',
                    _placeholder: 'Ingresa su nombre de usuario',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: '_password',
                _config: {
                  _id: '_password',
                  _type: 'password',
                  _input: {
                    _label: 'Contraseña',
                    _placeholder: 'Ingrese su contraseña',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,

            ],
          } as S2FormGroupModel,
        ],

        _saveButton: {
          _text: 'Iniciar Sesión',
          _resetOnSuccess: true,
          _validToSend: true
        } as S2ButtonModel
      } as S2SettingsFormGeneratorModel;

    config.tool = 'form-generator';

    config.fnOnSubmit = (event) => { console.log(event) }

    this.dialog.open(FormDialogComponent, { data: config })
  }

}
