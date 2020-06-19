import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivityComponent } from '../activity/activity.component';
import { ClassService } from 'src/app/services/class.service';
import { ClassParticipantsComponent } from '../class-participants/class-participants.component';
import { UserService } from 'src/app/services/user.service';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SithecConfig } from '../form-dialog/sithec.config.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { Activity } from '../activity/activity.model';
import { ActivityService } from '../activity/activity.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MessageConfig } from '../message-dialog/message-dialog.model';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { SessionService } from 'src/app/services/session.service';
import { S2ButtonFormModel } from 'src/app/form-component/models/s2-button-form.model';
import { TableFormComponent } from 'src/app/form-component/controls/form-generator/form-fields/table/table.component';
import { SithecSuiteService } from 'src/app/form-component/sithec-suite.service';
import { HeadersFormModel } from 'src/app/form-component/models/s2-headers-form.model';
import { S2TableFormModel } from 'src/app/form-component/models/s2-table-form.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  material = [/* {
    delivery_date: "20/06/2020",
    points : 10,
    title: "Activity 1",
    autor: "Juanito",
    description: " orem ipsum dolor sit amet consectetur adipisicing elit. Nulla, totam repellat, illo enim,quisquam incidunt nihil eveniet esse repudiandae perspiciatis voluptas a id vitae delectus! Magnam voluptatibusdolorum perferendis voluptatum",
    _id: 1,
  },
  {
    delivery_date: "20/06/2020",
    points : 10,
    title: "Material 2",
    autor: "Checo",
    description: " orem ipsum dolor sit amet consectetur adipisicing elit. Nulla, totam repellat, illo enim,quisquam incidunt nihil eveniet esse repudiandae perspiciatis voluptas a id vitae delectus! Magnam voluptatibusdolorum perferendis voluptatum",
    _id: 2,
  },
  {
    delivery_date: "20/06/2020",
    points : 10,
    title: "Resource 3",
    autor: "Serna",
    description: " Impartida por Luis en el semestre mayo-junio",
    _id: 3,
  } */
  ]

  @ViewChild('activities') activities: MatAccordion;

  string_idClass: string

  clasObj: any

  user_id = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activateRouter: ActivatedRoute,
    private classService: ClassService,
    private userService: UserService,
    private activityService: ActivityService,
    private sessionService: SessionService,
    private sithecSuiteService_tools: SithecSuiteService,
  ) { }

  ngOnInit(): void {
    this.string_idClass = this.activateRouter.snapshot.params.id;
    this.getClassById()
    this.getActivities()

    this.sessionService._session.subscribe(s => {
      if (s && s.user.teacher) {
        this.user_id = s.user._id;
      }
    })
  }

  getClassById(): void {
    this.classService.get(this.string_idClass).toPromise()
      .then((res: any) => {
        this.clasObj = res.item[0]

      })
      .catch((rej) => {
        console.error(rej)
      })
  }

  getActivities() {
    this.classService.getActivitiesByClass(this.string_idClass).toPromise()
      .then((res) => {
        this.material = res.item
        this.material.map(a => {
          var autorID = a.user
          this.userService.get(autorID)
            .toPromise()
            .then((autor: any) => {
              a['autor'] = autor.item.user_name;
            })
        })
      })
      .catch((rej) => {
        ///console.error(rej)
      })
  }
  file: File;
  fileSend: any[] = [];
  formData: FormData = new FormData();
  filesArraytoSend: File[] = [];
  formDataFiles = new FormData();
  createActivity() {
    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var form_newActivity: FormGroup = new FormGroup({
      user: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      room: new FormControl(null, Validators.required),
      limit_date: new FormControl(null, Validators.required),
      descriptionCourse: new FormControl(null, Validators.required),
      urlArchivo: new FormControl(null)
    });

    form_newActivity.patchValue({
      user: this.user_id,
      room: this.string_idClass
    })

    var config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: form_newActivity,
        _id: 'form-new-activity',
        _groups: [
          {
            _nameAs: 'activity-properties',
            _items: [
              {
                _control: 'user',
                _config: {
                  _id: 'user',
                  _type: 'text',
                  _hide: true,
                  _input: {
                    _label: '',
                    _placeholder: '',
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
                    _label: 'Titulo de la Actividad',
                    _placeholder: 'Ingresa un titulo',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'description',
                _config: {
                  _id: 'description',
                  _type: 'text',
                  _input: {
                    _label: 'Descripción de la actividad',
                    _placeholder: 'Ingrese una descripción',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'limit_date',
                _config: {
                  _id: 'limit_date',
                  _type: 'date',
                  _input: {
                    _label: 'Fecha limite de entrega',
                    _placeholder: '',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'room',
                _config: {
                  _id: 'room',
                  _type: 'text',
                  _hide: true,
                  _input: {
                    _label: '',
                    _placeholder: '',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,


            ],
          } as S2FormGroupModel,
          {
            _title: 'Recursos',
            _nameAs: 'resource',
            _items: [
              {
                _control: 'descriptionCourse',
                _config: {
                  _id: 'descriptionC',
                  _type: 'text',
                  _input: {
                    _label: 'Descripción del recurso',
                    _placeholder: 'Ingrese una descripción del recurso',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,

              {
                _config: {
                  _id: "boton",
                  _type: "button",
                  _button: {
                    _text: "Cargar cosa de fuantos",
                    _class: "btn btn-primary",
                    _columns: {
                      _xl: 12,
                      _lg: 12,
                      _md: 12,
                      _sm: 12
                    }

                  } as S2ButtonFormModel
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'urlArchivo',
                _config: {

                  _id: "table",
                  _type: "table",
                  _table: {
                    _enableFilters: true,
                    _label: "Comprobante pago",
                    _checkbox: false,
                    _checkboxHeader: false,
                    _collapse: false,
                    _primaryKey: '_URL',
                    _options: [],
                    _tableHeaders: [
                      {
                        _title: "Nombre",
                        _columName: "_nombre",
                        _filter: false
                      } as HeadersFormModel,
                    ],
                    _columns: inputColumns,
                    _iconsButtons: [
                      {
                        _id: "iconPrevisualizacion",
                        _icon: "fa fa-eye"
                      }
                    ]

                  } as S2TableFormModel
                } as S2FormField
              } as S2FormGroupItemModel,
            ]
          } as S2FormGroupModel,
        ],

        _saveButton: {
          _text: 'Crear actividad',
          _resetOnSuccess: true,
          _validToSend: true
        } as S2ButtonModel
      } as S2SettingsFormGeneratorModel;
    config.tool = 'form-generator';

    config.fnOnClickFormButton = (event, files) => {
      this.fileSend = [];//reinicia el array
      console.log(event)
      let tableComponent: TableFormComponent = this.sithecSuiteService_tools.fnGetFormElement('form-new-activity', 'table');
      var input = document.createElement("input");
      console.log(input)
      input.type = 'file';
      input.accept = '.pdf,.jpg,.png,.jpeg';
      input.multiple = false;
      input.onchange = (event: any) => {
        console.log(event)

        /*un archivo*/
        let input = event.path[0];
        this.file = input.files[0]

        //files = "cosa fea"
        let selectedFiles = (event.target || event.srcElement).files;
        console.log(selectedFiles)

        /*multiples archivos*/
        let aux = {
          _nombre: this.file.name
        }
        tableComponent.fnSetOptions(this.fileSend);//reemplaza el archivo que estaba por el nuevo
        this.fileSend.push(aux)
        tableComponent.fnSetOptions(this.fileSend);//ingresa el nuevo archivo

      }
      input.click()
      event.fnOffSpinner(true)



    }

    config.fnOnSubmit = (event, ref: MatDialogRef<any>, files) => {
      console.log(this.file, event)
      let formData: FormData = new FormData();

      if (this.file) {
        formData.append('myfile', this.file, this.file.name)


      }

      Object.keys(event.data['resource']).map(k => {
        formData.append('description', event.data['resource'][k])
      })
      formData.append('user', this.user_id)




      var newActivity: Activity = new Activity()


      Object.keys(event.data['activity-properties']).map(k => {
        newActivity[k] = event.data['activity-properties'][k]

      })
      /*
            this.activityService.create(newActivity).toPromise()
              .then((res) => {
                ref.close(1)
              })
              .catch((err) => {
                ref.close(-1)
              })*/
    }


    /* config.title = "Iniciar Sesión"
    config.message = "Accede ya al mejor sistema academico!" */

    this.dialog.open(FormDialogComponent, { data: config, panelClass: "dialog-fuchi" }).afterClosed()
      .toPromise()
      .then((res) => {
        if (res && res == -1) {
          var message: MessageConfig = {
            title: "Crear actividad",
            message: "Ocurrio un error al crear una actividad."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          this.getActivities()
        } else if (res && res == 1) {
          var message: MessageConfig = {
            title: "Crear actividad",
            message: "Actividad creada correctamente."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
        }
      })
  }

  editActivity(act: Activity) {
    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var form_editActivity: FormGroup = new FormGroup({
      _id: new FormControl(null, Validators.required),
      user: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      room: new FormControl(null, Validators.required),
      limit_date: new FormControl(null, Validators.required),
    });

    form_editActivity.patchValue({
      _id: act._id,
      user: act.user,
      title: act.title,
      room: act.room,
      description: act.description,
      limit_date: act.limit_date.split('T')[0]
    })

    var config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: form_editActivity,
        _id: 'form-edit-activity',
        _groups: [
          {
            _nameAs: 'activity-properties',
            _items: [
              {
                _control: '_id',
                _config: {
                  _id: '_id',
                  _type: 'text',
                  _hide: true,
                  _input: {
                    _label: '',
                    _placeholder: '',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'user',
                _config: {
                  _id: 'user',
                  _type: 'text',
                  _hide: true,
                  _input: {
                    _label: '',
                    _placeholder: '',
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
                    _label: 'Titulo de la Actividad',
                    _placeholder: 'Ingresa un titulo',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'description',
                _config: {
                  _id: 'description',
                  _type: 'text',
                  _input: {
                    _label: 'Descripción de la actividad',
                    _placeholder: 'Ingrese una descripción',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'limit_date',
                _config: {
                  _id: 'limit_date',
                  _type: 'date',
                  _input: {
                    _label: 'Fecha limite de entrega',
                    _placeholder: '',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'room',
                _config: {
                  _id: 'room',
                  _type: 'text',
                  _hide: true,
                  _input: {
                    _label: '',
                    _placeholder: '',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,

            ],
          } as S2FormGroupModel,
        ],

        _saveButton: {
          _text: 'Editar actividad',
          _resetOnSuccess: true,
          _validToSend: true
        } as S2ButtonModel
      } as S2SettingsFormGeneratorModel;
    config.tool = 'form-generator';

    config.fnOnSubmit = (event, ref: MatDialogRef<any>) => {
      var updateActivity: Activity = new Activity()

      Object.keys(event.data['activity-properties']).map(k => {
        updateActivity[k] = event.data['activity-properties'][k]
      })

      this.activityService.update(updateActivity._id, updateActivity).toPromise()
        .then((res) => {
          ref.close(1)
        })
        .catch((err) => {
          ref.close(-1)
        })
    }

    this.dialog.open(FormDialogComponent, { data: config, panelClass: "dialog-fuchi" }).afterClosed()
      .toPromise()
      .then((res) => {
        if (res && res == -1) {
          var message: MessageConfig = {
            title: "Editar actividad",
            message: "Ocurrio un error al actualizar una actividad."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          this.getActivities()
        } else if (res && res == 1) {
          var message: MessageConfig = {
            title: "Editar actividad",
            message: "Actividad actualizar correctamente."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi", width: "200px",height: '350px' });
        }
      })
  }

  showActivity(activity: any) {
    this.dialog.open(ActivityComponent, { data: activity, panelClass: "dialog-fuchi", width: "800px" })
  }


  showParticipants() {
    this.dialog.open(ClassParticipantsComponent, { data: this.clasObj, panelClass: "dialog-fuchi", width: "800px" })
  }
}
