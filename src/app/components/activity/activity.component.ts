import { Component, OnInit, Inject } from '@angular/core';
import { Activity } from './activity.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ResourcesService } from 'src/app/services/resources.service';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonFormModel } from 'src/app/form-component/models/s2-button-form.model';
import { HeadersFormModel } from 'src/app/form-component/models/s2-headers-form.model';
import { S2TableFormModel } from 'src/app/form-component/models/s2-table-form.model';
import { environment } from 'src/environments/environment';
import { TableFormComponent } from 'src/app/form-component/controls/form-generator/form-fields/table/table.component';
import { SithecSuiteService } from 'src/app/form-component/sithec-suite.service';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { DeliveryModel } from './delivery.model';
import { DeliveryService } from 'src/app/services/delivery.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  title: string = ""

  autor: string = ""

  description: string = ""

  limit_date: string = ""

  points: number = 0;

  resource: any = null

  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

  fileSend = null

  file = null

  session: Observable<any>

  formGroup_newDelivery: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    message: new FormControl(null, []),
    //comments: new FormControl(null, []),
    activity: new FormControl(null, Validators.required),
    user: new FormControl(null, Validators.required),


    resources: new FormControl(null, Validators.required),

    descriptionResource: new FormControl(null, []),
    urlArchivo: new FormControl(null)
  });

  settings_form = {
    _formGroup: this.formGroup_newDelivery,

    _id: 'form-new-Delivery',
    _groups: [
      {
        _title: 'Entrega',
        _nameAs: 'new-delivery',
        _items: [
          {
            _control: "title",
            _config: {
              _id: "title",
              _type: "text",
              _input: {
                _label: 'Nombre de la entrega',
                _placeholder: 'Ingresa un nombre',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _control: "message",
            _config: {
              _id: "message",
              _type: "text",
              _input: {
                _label: 'Mensaje (opcional)',
                _placeholder: 'Ingresa un mensaje',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel,
          /* {
            _control: "comments",
            _config: {
              _id: "comments",
              _type: "text",
              _input: {
                _label: 'Comentarios (opcional)',
                _placeholder: 'Ingresa un comentario',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel, */
          {
            _control: "activity",
            _config: {
              _id: "activity",
              _type: "text",
              _hide: true,
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _control: "user",
            _config: {
              _id: "user",
              _type: "text",
              _hide: true,
            } as S2FormField
          } as S2FormGroupItemModel,
        ],
      } as S2FormGroupModel,
      {
        _title: 'Recursos',
        _nameAs: 'resources-properties',
        _items: [
          {
            _control: 'descriptionResource',
            _config: {
              _id: 'descriptionResource',
              _type: 'text',
              _input: {
                _label: 'Descripción del recurso',
                _placeholder: 'Ingrese una descripción del recurso',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel,

          {
            _config: {
              _id: "boton",
              _type: "button",
              _button: {
                _text: "Subir archivo...",
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
                _label: "Archivos",
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
                _columns: this.inputColumns
              } as S2TableFormModel
            } as S2FormField
          } as S2FormGroupItemModel,
        ]
      } as S2FormGroupModel,


    ],

    _saveButton: {
      _text: 'Enviar',
      _resetOnSuccess: true,
      _validToSend: true
    } as S2ButtonModel
  } as S2SettingsFormGeneratorModel

  user_id

  deliveries

  delivered = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Activity,
    public dialogRef: MatDialogRef<ActivityComponent>,
    private resourcesService: ResourcesService,
    private sithecSuiteService_tools: SithecSuiteService,
    private sessionService: SessionService,
    private deliveryService: DeliveryService,
    private loader: LoaderService,
    private userService : UserService,
    private dialog : MatDialog
    //private dialog : MatDialog
  ) {
    this.loader.show()
    console.log(this.data)
    Object.keys(this.data).map(k => {
      this[k] = this.data[k];
    })

    if (this.data.resources && this.data.resources.length > 0) {
      this.resource = this.data.resources[0]
    }

    this.session = this.sessionService._session

    this.session.subscribe(s => {
      if (s && s.user.student) {
        this.formGroup_newDelivery.patchValue({
          activity: this.data._id,
          user: s.user._id
        })
        this.user_id = s.user._id
        this.deliveryService.getDeliveriesByActivity(this.data._id).toPromise()
          .then((res) => {
            this.deliveries = res.item
            this.delivered = this.deliveries.find(d => d.user == this.user_id)
            if (this.delivered)
              this.delivered['link'] = this.delivered.resources[0]
          })
          .catch((err) => {
            console.error(err)
          })
          .finally(() => {
            this.loader.hide()
          })
      }else{
        this.deliveryService.getDeliveriesByActivity(this.data._id).toPromise()
          .then((res) => {
            this.deliveries = res.item
          })
          .then(async () => {
            for (let i = 0; i < this.deliveries.length; i++) {
              var res : any = await this.userService.get(this.deliveries[i].user).toPromise()
              this.deliveries[i]['madeBy'] = res.item[0]
            }
          })
          .catch((err) => {
            console.error(err)
          })
          .finally(() => {
            this.loader.hide()
          })
      }

    })


  }

  openActivityResource(id: string) {
    if (!id || id == "") {
      var error = {
        title: "Error",
        message: "Ocurrio un error al abrir el recurso"
      }
      //this.dialog.open(MessageDialogComponent, { data: error, panelClass: "dialog-fuchi" });
    } else {
      window.open(environment.server + "download/" + id);
    }
  }

  fnOnSubmit(event) {

    let formData: FormData = new FormData();
    let newDelivery: DeliveryModel = new DeliveryModel();

    if (this.file) {
      formData.append('myFile', this.file, this.file.name)
    }

    formData.append('description', event.data['resources-properties']['descriptionResource'])
    formData.append('user', this.user_id)

    Object.keys(event.data['new-delivery']).map(k => {
      newDelivery[k] = event.data['new-delivery'][k]
    })

    this.resourcesService.createResource(formData).toPromise()
      .then((res) => {
        newDelivery.resources = [];
        newDelivery.resources.push(res.item._id)
        this.deliveryService.create(newDelivery).toPromise()
          .then((res) => {
            var successData = {
              title : "Entrega de actividad",
              message : "Actividad entregada correctamente"
            }
            this.dialog.open(MessageDialogComponent, {data : successData, panelClass: "dialog-fuchi"}).afterClosed().toPromise()
            .then(() => {
              this.dialogRef.close()
            })

          })
          .catch((err) => {
            console.error(err)
            var errorData = {
              title : "Error",
              message : "Ocurrio un error al entregar"
            }
            this.dialog.open(MessageDialogComponent, {data : errorData, panelClass: "dialog-fuchi"}).afterClosed().toPromise()
            .then(() => {
              this.dialogRef.close()
            })
          })
      })
  }

  fnOnClickFormButton(event) {
    this.fileSend = []
    this.file = null
    let tableComponent: TableFormComponent = this.sithecSuiteService_tools.fnGetFormElement('form-new-Delivery', 'table');
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

      //AQUI
      this.formGroup_newDelivery.patchValue({
        resources: this.file.name
      })
    }
    input.click()
    event.fnOffSpinner(true)

  }


  ngOnInit(): void {
  }

  close(state?: number) { this.dialogRef.close(state) };

}
