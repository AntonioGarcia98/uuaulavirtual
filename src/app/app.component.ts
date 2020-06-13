import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { MessageConfig } from './components/message-dialog/message-dialog.model';
import { LoginRequest } from './models/login-request.model';
import { S2SelectFormModel } from './form-component/models/s2-select-form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uuaulavirtual';


  userTypeOptions: any = [{
    idUserType: 1,
    name: "Alumnos"

  },
  {
    idUserType: 2,
    name: "Maestro"

  },

  ]

  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
    private userService: UserService
  ) {
  }

  fnOnSend(event) {
    console.log(event)
  }

  async createAccount() {

    var response: any = null;

    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var formGroup_newUser: FormGroup = new FormGroup({
      user_name: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      /* phone_number : new FormControl(null, []), */
      password: new FormControl(null, []),
      userType: new FormControl(null, []),
      scholarship: new FormControl(null, []),
      grade: new FormControl(null),

      //maestro
      title: new FormControl(null),
      professional_number: new FormControl(null)

    });

    let  config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: formGroup_newUser,
        _id: 'form-new-user',
        _groups: [
          {
            _nameAs: 'user-credentials',
            _title: 'Información personal',
            _items: [
              {
                _control: 'user_name',
                _config: {
                  _id: 'user_name',
                  _type: 'text',
                  _input: {
                    _label: 'Usuario',
                    _placeholder: 'Ingresa su nombre de usuario',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'name',
                _config: {
                  _id: 'name',
                  _type: 'text',
                  _input: {
                    _label: 'Nombre(s)',
                    _placeholder: 'Ingrese su(s) nombre(s)',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'last_name',
                _config: {
                  _id: 'last_name',
                  _type: 'text',
                  _input: {
                    _label: 'Apellido(s)',
                    _placeholder: 'Ingrese su(s) apellido(s)',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'birthdate',
                _config: {
                  _id: 'birthdate',
                  _type: 'date',
                  _input: {
                    _label: 'Fecha de Nacimiento',
                    _placeholder: 'Ingrese su fecha de nacimiento',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'password',
                _config: {
                  _id: 'password',
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
          {
            _nameAs: 'contact-credentials',
            _title: 'Contacto del Usuario',
            _items: [
              {
                _control: 'email',
                _config: {
                  _id: 'email',
                  _type: 'text',
                  _input: {
                    _label: 'Correo Electrónico',
                    _placeholder: 'Ingresa su correo electrónico',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: "idUserType",
                _config: {
                  _id: "UserType",
                  _type: "select",
                  _select: {
                    _options: this.userTypeOptions,
                    _optionKey: 'name',
                    _valueKey: 'idUserType',
                    _label: 'Tipo de usuario',
                    _columns: inputColumns
    
                  } as S2SelectFormModel
                } as S2FormField
              } as S2FormGroupItemModel,
    
              {
                _control: 'scholarship',
                _config: {
                  _id: 'scholarship',
                  _type: 'text',
                  _input: {
                    _label: 'Escolaridad',
                    _placeholder: 'Ingresa la escolaridad',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'grade',
                _config: {
                  _id: 'grade',
                  _type: 'text',
                  _input: {
                    _label: 'Grado',
                    _placeholder: 'Ingresa el grado',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'title',
                _config: {
                  _id: 'title',
                  _type: 'text',
                  _input: {
                    _label: 'Titulo academico',
                    _placeholder: 'Ingresa su titulo academico',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'professional_number',
                _config: {
                  _id: 'professional_number',
                  _type: 'text',
                  _input: {
                    _label: 'Cedula Profesional',
                    _placeholder: 'Ingresa su cedula profesional',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,

              /* {
                _control: 'phone_number',
                _config: {
                  _id: 'phone_number',
                  _type: 'number',
                  _input: {
                    _label: 'Telefono(s)',
                    _placeholder: 'Ingrese su(s) telefonos', //Podemos dejarlo como text o number, validar la entrada de puntos o letras, y que separe telefonos por comas
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel, */
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
    config.fnOnSubmit = this.fnNewUser;
    config.fnOnChange = this.fnOnChange;
    config.title = "Crear cuenta"
    config.message = "Registrate en el mejor sistema academico!"

    this.dialog.open(FormDialogComponent, { data: config, panelClass: "dialog-fuchi", height: "600px" }).afterClosed()
      .toPromise()
      .then((res) => {
        if (res) {
          if (res == 1) {
            var message: MessageConfig = {
              title: "Crear usuario",
              message: "Usuario creado correctamente."
            }
            this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          } else if (res == -1) {
            var message: MessageConfig = {
              title: "Crear usuario",
              message: "Ocurrio un error al tratar de crear el usuario."
            }
            this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          }
        }
      })
  }

  
  fnOnChange(event, settings)
  {
      console.log("cambio",event)
      let SelectidUserType = event.event.target.value;
      if(event.id =="UserType"){
        if(SelectidUserType==1){
          settings._groups[1]._items[2]._config._hide = false;
          settings._groups[1]._items[3]._config._hide = false;
          settings._groups[1]._items[4]._config._hide = true;
          settings._groups[1]._items[5]._config._hide = true;

        }else if(SelectidUserType ==2){
          settings._groups[1]._items[2]._config._hide = true;
          settings._groups[1]._items[3]._config._hide = true;
          settings._groups[1]._items[4]._config._hide = false;
          settings._groups[1]._items[5]._config._hide = false;
        }
      }
  }

  fnNewUser(event, ref: MatDialogRef<any>)
  {
      var newUser: User = new User()

      console.log(event.data)

      Object.keys(event.data['user-credentials']).map(k => {
        newUser[k] = event.data['user-credentials'][k]
      })

      newUser['contact'] = event.data['contact-credentials'];

      this.userService.create(newUser).toPromise()
        .then((res) => {
          console.log(res)
          console.log('done');
          ref.close(1)
        })
        .catch((err) => {
          ref.close(-1)
        })
  }

<<<<<<< HEAD
=======



>>>>>>> 0f235cff91274db003e6dabc347dc43c96958545
  async login() {

    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var formGroup_newUser: FormGroup = new FormGroup({
      user_name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
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
                _control: 'user_name',
                _config: {
                  _id: 'user_name',
                  _type: 'text',
                  _input: {
                    _label: 'Usuario',
                    _placeholder: 'Ingresa su nombre de usuario',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'password',
                _config: {
                  _id: 'password',
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
    config.fnOnSubmit = (event, ref: MatDialogRef<any>) => {
      var loginRequest: LoginRequest = new LoginRequest()

      console.log(event.data)

      Object.keys(event.data['user-credentials']).map(k => {
        loginRequest[k] = event.data['user-credentials'][k]
      })

      this.sessionService.login(loginRequest)
        .then((res) => {
          console.log(res)
          console.log('done');
          ref.close(1)
        })
        .catch((err) => {
          ref.close(-1)
        })
    }
    config.title = "Iniciar Sesión"
    config.message = "Accede ya al mejor sistema academico!"

    this.dialog.open(FormDialogComponent, { data: config, panelClass: "dialog-fuchi" }).afterClosed()
      .toPromise()
      .then((res) => {
        if (res && res == -1) {
          var message: MessageConfig = {
            title: "Iniciar sesión",
            message: "Usuario y/o contraseña incorrecto(s)."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
        }
      })
  }

}
