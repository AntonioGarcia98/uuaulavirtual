import { Component, OnInit, Inject } from '@angular/core';
import { Activity } from './activity.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResourcesService } from 'src/app/services/resources.service';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonFormModel } from 'src/app/form-component/models/s2-button-form.model';
import { HeadersFormModel } from 'src/app/form-component/models/s2-headers-form.model';
import { S2TableFormModel } from 'src/app/form-component/models/s2-table-form.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  title: string = ""

  autor: string = ""

  description: string = ""

  delivery_date: string = ""

  points: number = 0;

  resource: any = null

  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

  formGroup_newDelivery: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    message: new FormControl(null, []),
    activity: new FormControl(null, Validators.required),
    user: new FormControl(null, Validators.required),
    resources: new FormControl(null, Validators.required),
    comments: new FormControl(null, Validators.required),
  });

  settings_form = {
    _formGroup: this.formGroup_newDelivery,

    _id: 'form-new-Delivery',
    _groups: [
      {
        _nameAs: 'new-delivery',
        _items: [
          {
            _control: "title",
            _config: {
              _id: "title",
              _type: "string",
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
              _type: "string",
              _input: {
                _label: 'Mensaje (opcional)',
                _placeholder: 'Ingresa un mensaje',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _control: "activity",
            _config: {
              _id: "activity",
              _type: "string",
              _hide: true,
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _control: "user",
            _config: {
              _id: "user",
              _type: "string",
              _hide: true,
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
                _columns: this.inputColumns
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
                _columns: this.inputColumns,
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
      _text: 'Enviar',
      _resetOnSuccess: true,
      _validToSend: true
    } as S2ButtonModel
  } as S2SettingsFormGeneratorModel

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Activity,
    public dialogRef: MatDialogRef<ActivityComponent>,
    private resourcesService: ResourcesService
  ) {
    console.log(this.data)
    Object.keys(this.data).map(k => {
      this[k] = this.data[k];
    })

    if (this.data.resources && this.data.resources.length > 0) {
      this.resourcesService.downloadResource(this.data.resources[0]).toPromise()
        .then((res) => {
          console.log(res)
          window.open(res, "_blank");
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  fnOnSend(event)
  {
    console.log(event)
  }


  ngOnInit(): void {
  }

  closeDialog(state?: number) { this.dialogRef.close(state) };

}
