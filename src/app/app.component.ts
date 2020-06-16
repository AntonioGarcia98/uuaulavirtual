import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { S2BootstrapColumnsModel } from './form-component/models/s2-bootstrap-columns.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { S2InputForm } from './form-component/models/s2-input-form.model';
import { S2FormField } from './form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from './form-component/models/s2-form-group-item.model';
import { S2FormGroupModel } from './form-component/models/s2-form-group.model';
import { S2ButtonModel } from './form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from './form-component/models/s2-settings-form-generator.model';
import { SithecConfig } from './components/form-dialog/sithec.config.model';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { SessionService } from './services/session.service';
import { Student, Teacher, User } from './models/user.model';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { MessageConfig } from './components/message-dialog/message-dialog.model';
import { LoginRequest } from './models/login-request.model';
import { S2SelectFormModel } from './form-component/models/s2-select-form.model';
import { StudentService } from './services/student.service';
import { TeacherService } from './services/teacher.service';
import { SchoolService } from './services/school.service';
import { SelectComponent } from './form-component/controls/form-generator/form-fields/select/select.component';
import { SithecSuiteService } from './form-component/sithec-suite.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'uuaulavirtual';

  userTypeOptions: any = [
    {
      idUserType: 1,
      name: "Alumnos"
    },
    {
      idUserType: 2,
      name: "Maestro"
    },
  ]

  schools: any[] = []

  session: Observable<any>

  user : any

  constructor(
    private dialog: MatDialog,
    public sessionService: SessionService,
    public studentService: StudentService,
    public teacherService: TeacherService,
    public schoolService: SchoolService,
  ) {
    this.session = this.sessionService._session;

    this.user = this.sessionService.getSession()?.user
  }

  ngOnInit() {
    this.getCatalogs()
  }

  getCatalogs() {
    return Promise.all([
      this.schoolService.getAll().toPromise()
    ])
      .then((catalogs: any) => {
        this.schools = catalogs[0].item
      })
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
      password: new FormControl(null, [Validators.required]),
      userType: new FormControl(1, [Validators.required]),

      //estudiante
      scholarship: new FormControl(null, []),
      grade: new FormControl(null),
      school: new FormControl(1),

      //maestro
      title: new FormControl(null),
      professional_number: new FormControl(null)

    });

    let config: SithecConfig = new SithecConfig()
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
              {
                _control: "userType",
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
                _control: "school",
                _config: {
                  _id: "school",
                  _type: "select",
                  _select: {
                    _options: this.schools,
                    _optionKey: 'name',
                    _valueKey: '_id',
                    _label: 'Escuela',
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
                  _hide: true,
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
                  _hide: true,
                  _input: {
                    _label: 'Cedula Profesional',
                    _placeholder: 'Ingresa su cedula profesional',
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
    config.fnOnSubmit = (event, ref: MatDialogRef<any>) => { //Los servicios no funcionan cuando se define la función y se asigna al objeto
      var userType: number = event.data['user-credentials'].userType;
      var newUser: any = {};

      if (userType == 1)//Usuario alumno
      {
        var auxUser: Student = new Student();
        Object.keys(auxUser).map(k => {
          var value = event.data['user-credentials'][k] || null;
          auxUser[k] = value;
        })

        //Student
        auxUser.student =
        {
          scholarship: event.data['user-credentials']['scholarship'],
          grade: event.data['user-credentials']['grade'],
          school: event.data['user-credentials']['school'],
        }

        newUser = JSON.parse(JSON.stringify(auxUser));

      } else {

        //Usuario maestro
        var auxTeacher: Teacher = new Teacher();
        Object.keys(auxTeacher).map(k => {
          var value = event.data['user-credentials'][k] || null;
          auxTeacher[k] = value;
        })

        //Teacher
        auxTeacher.teacher =
        {
          title: event.data['user-credentials']['title'],
          professional_number: event.data['user-credentials']['professional_number'],
          //role: event.data['user-credentials']['role'],
          role: "ADMIN_ROLE"
        }


        newUser = JSON.parse(JSON.stringify(auxTeacher));
      }

      newUser.contact = event.data['contact-credentials']

      if (userType == 1)//Usuario alumno
      {
        this.studentService.create(newUser).toPromise()
          .then((res) => {
            ref.close(1)
          })
          .catch((err) => {
            ref.close({info:-1,error:err})
          })

      } else {//Usuario maestro
        this.teacherService.create(newUser).toPromise()
          .then((res) => {
            ref.close(1)
          })
          .catch((err) => {
            ref.close({info:-1,error:err})
          })
      }

    }

    config.fnOnChange = this.fnOnChange;
    config.title = "Crear cuenta"
    config.message = "Registrate en el mejor sistema academico!"



    this.dialog.open(FormDialogComponent, { data: config, panelClass: "dialog-fuchi", height: "600px" }).afterClosed()
      .toPromise()
      .then((res) => {
        if (res) {
          if (res.info == 1) {

            var message: MessageConfig = {
              title: "Crear usuario",
              message: "Usuario creado correctamente."
            }
            this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          } else if (res.info == -1) {
            var message: MessageConfig = {
              title: "Crear usuario",
              message: res.error.error.error.message
            }
            this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          }
        }
      })
  }

  fnOnChange(event, settings) {
    let SelectidUserType = event.event.target.value;
    if (event.id == "UserType") {
      if (SelectidUserType == 1) {
        settings._groups[0]._items[6]._config._hide = false;
        settings._groups[0]._items[7]._config._hide = false;
        settings._groups[0]._items[8]._config._hide = false;
        settings._groups[0]._items[9]._config._hide = true;
        settings._groups[0]._items[10]._config._hide = true;

      } else if (SelectidUserType == 2) {
        settings._groups[0]._items[6]._config._hide = true;
        settings._groups[0]._items[7]._config._hide = true;
        settings._groups[0]._items[8]._config._hide = true;
        settings._groups[0]._items[9]._config._hide = false;
        settings._groups[0]._items[10]._config._hide = false;
      }
    } else {
      return
    }
  }


  login() {

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

      Object.keys(event.data['user-credentials']).map(k => {
        loginRequest[k] = event.data['user-credentials'][k]
      })

      this.sessionService.login(loginRequest)
        .then((res) => {
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
        } else if (res && res == 1) {
          location.reload()
        }
      })
  }

  logout() {
    this.sessionService.logout()
    location.reload()
  }

  edit() {
    var response: any = null;

    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var userType = (this.user.student) ? 1 : 2;

    var formGroup_editUser: FormGroup = new FormGroup({
      _id: new FormControl(null, Validators.required), 
      user_name: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      /* phone_number : new FormControl(null, []), */
      userType: new FormControl(null, []),

      //estudiante
      scholarship: new FormControl(null, []),
      grade: new FormControl(null),
      school: new FormControl(null),

      //maestro
      title: new FormControl(null),
      professional_number: new FormControl(null)

    });
    console.log(this.user)

    formGroup_editUser.setValue({
      _id: this.user._id,
      user_name: this.user.user_name,
      name: this.user.name,
      last_name: this.user.last_name,
      birthdate: this.user.birthdate.split('T')[0],
      email: this.user.contact.email,
      /* phone_number : new FormControl(null, []), */

      userType: (this.user.student) ? 1 : 2,

      //estudiante
      scholarship: (this.user.student) ? this.user.student.scholarship : null,
      grade: (this.user.student) ? this.user.student.grade : null,
      school: (this.user.student) ? this.user.student.school : null,

      //maestro
      title: (this.user.teacher) ? this.user.teacher.title : null,
      professional_number: (this.user.teacher) ? this.user.teacher.professional_number : null
    })

    let config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: formGroup_editUser,
        _id: 'form-new-user',
        _groups: [
          {
            _nameAs: 'user-credentials',
            _title: 'Información personal',
            _items: [
              {
                _control: '_id',
                _config: {
                  _id: '_id',
                  _type: 'number',
                  _hide : true,
                  _input: {
                    _label: '',
                    _placeholder: '',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
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
              /* {
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
              } as S2FormGroupItemModel, */
              {
                _control: "userType",
                _config: {
                  _id: "UserType",
                  _type: "select",
                  _hide : true,
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
                _control: "school",
                _config: {
                  _id: "school",
                  _type: "select",
                  _hide: (this.user.student) ? false : true,
                  _select: {
                    _options: this.schools,
                    _optionKey: 'name',
                    _valueKey: '_id',
                    _label: 'Escuela',
                    _columns: inputColumns
                  } as S2SelectFormModel
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'scholarship',
                _config: {
                  _id: 'scholarship',
                  _type: 'text',
                  _hide: (this.user.student) ? false : true,
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
                  _hide: (this.user.student) ? false : true,
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
                  _hide: (this.user.teacher) ? false : true,
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
                  _hide: (this.user.teacher) ? false : true,
                  _input: {
                    _label: 'Cedula Profesional',
                    _placeholder: 'Ingresa su cedula profesional',
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
          _text: 'Actualizar',
          _resetOnSuccess: true,
          _validToSend: true
        } as S2ButtonModel
      } as S2SettingsFormGeneratorModel;
    config.tool = 'form-generator';
    config.fnOnSubmit = (event, ref: MatDialogRef<any>) => { //Los servicios no funcionan cuando se define la función y se asigna al objeto
      var userType: number = event.data['user-credentials'].userType;
      var newUser: User = new User();

      Object.keys(newUser).map(k => {
        var value = event.data['user-credentials'][k] || null;
        newUser[k] = value;
      })

      /* if (userType == 1)//Usuario alumno
      {
        var auxUser: Student = new Student();
        Object.keys(auxUser).map(k => {
          var value = event.data['user-credentials'][k] || null;
          auxUser[k] = value;
        })

        //Student
        auxUser.student =
        {
          scholarship: event.data['user-credentials']['scholarship'],
          grade: event.data['user-credentials']['grade'],
          school: event.data['user-credentials']['school'],
        }

        newUser = JSON.parse(JSON.stringify(auxUser));

      } else {

        //Usuario maestro
        var auxTeacher: Teacher = new Teacher();
        Object.keys(auxTeacher).map(k => {
          var value = event.data['user-credentials'][k] || null;
          auxTeacher[k] = value;
        })

        //Teacher
        auxTeacher.teacher =
        {
          title: event.data['user-credentials']['title'],
          professional_number: event.data['user-credentials']['professional_number'],
          //role: event.data['user-credentials']['role'],
          role: "ADMIN_ROLE"
        }


        newUser = JSON.parse(JSON.stringify(auxTeacher));
      } */

      newUser.contact = event.data['contact-credentials']

      if (userType == 1)//Usuario alumno
      {
        this.studentService.create(newUser).toPromise()
          .then((res) => {
            ref.close(1)
          })
          .catch((err) => {
            ref.close(-1)
          })

      } else {//Usuario maestro
        this.teacherService.create(newUser).toPromise()
          .then((res) => {
            ref.close(1)
          })
          .catch((err) => {
            ref.close(-1)
          })
      }

    }

    config.fnOnChange = this.fnOnChange;
    config.title = "Editar cuenta"
    config.message = ""



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
}
