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
import { SessionService } from 'src/app/services/session.service';
import { GroupService } from 'src/app/services/group.service';
import { SchoolService } from 'src/app/services/school.service';
import { SithecSuiteService } from 'src/app/form-component/sithec-suite.service';
import { SelectComponent } from 'src/app/form-component/controls/form-generator/form-fields/select/select.component';
import { Session } from 'protractor';

import { S2ButtonFormModel } from 'src/app/form-component/models/s2-button-form.model';
import { TableFormComponent } from 'src/app/form-component/controls/form-generator/form-fields/table/table.component';
import { HeadersFormModel } from 'src/app/form-component/models/s2-headers-form.model';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {



  headersTable = [
    {
      _title: "Nombre",
      _columName: "_nombre",
      _filter: false
    } as HeadersFormModel,
  ]

  schoolsArraySelect: any[]

  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;
  sessionData: Session
  constructor(
    private sessionService: SessionService,
    private groupService: GroupService,
    private schoolService: SchoolService,
    private formService: SithecSuiteService,
    private sithecSuiteService_tools: SithecSuiteService,
  ) { }

  ngOnInit(): void {
    this.getSchools()
    this.subscribeSession()
  }

  subscribeSession(): void {
    this.sessionService._session.subscribe(data => {
      console.log(data)
      this.sessionData = data
    })
  }

  formGroup_newGroup: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    scholarship: new FormControl(null, Validators.required),
    grade: new FormControl(null, Validators.required),
    school: new FormControl(null, Validators.required),
    urlArchivo: new FormControl(null)


  });

  settings_form = {
    _formGroup: this.formGroup_newGroup,

    _id: 'form-new-Group',
    _groups: [
      {
        _nameAs: 'new-group',
        _items: [
          {
            _control: 'name',
            _config: {
              _id: 'name',
              _type: 'text',
              _input: {
                _label: 'Nombre',
                _placeholder: 'Ingresa un nombre',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _control: 'scholarship',
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
            _control: 'grade',
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
            _control: "school",
            _config: {
              _id: "School",
              _type: "select",
              _select: {
                _options: [],
                _optionKey: 'name',
                _valueKey: '_id',
                _label: 'Escuela',
                _columns: this.inputColumns

              } as S2SelectFormModel
            } as S2FormField
          } as S2FormGroupItemModel,
          {
            _config: {
              _id: "boton",
              _type: "button",
              _button: {
                _text: "Cargar archivo",
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
                _tableHeaders: this.headersTable,
                _columns: this.inputColumns,
                _iconsButtons: [
                  {
                    _id: "iconDelete",
                    _icon: "fa fa-trash-o"
                  },
                  {
                    _id: "iconPrevisualizacion",
                    _icon: "fa fa-eye"
                  }
                ]

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



  getSchools(): void {
    this.schoolService.getAll().toPromise()
      .then((res: any) => {
        console.log(res)
        this.schoolsArraySelect = res.item;
        this.fnPutData()
        console.log(this.schoolsArraySelect);
      })
      .catch((rej) => {
        console.log(rej)
      })
  }

  fnPutData() {
    let select: SelectComponent = this.formService.fnGetFormElement('form-new-Group', 'School');
    if (this.schoolsArraySelect.length > 0) {
      select.fnReloadOptions(this.schoolsArraySelect, this.schoolsArraySelect[0]._id);

    } else {
      select.fnReloadOptions([], null);
    }
  }

  fnOnSend(event): void {
    console.log(event)
    let grouptoSend = event.data['new-group']
    grouptoSend.user = this.sessionData['user']._id
    console.log(grouptoSend)
    this.groupService.create(grouptoSend).toPromise()
      .then((res) => {
        console.log(res)
        event.fnOffSpinner(true);
        console.log('done');

      })
      .catch((err) => {
        event.fnOffSpinner(false);
      })
  }  /*archivo*/

  fnClickButton(event): void {
    console.log(event)
    if (event.id == "boton") {
      this.fnUploadFile(event)
    }

  }




  file: File;
  fileSend: any[] = [];
  formData: FormData = new FormData();
  filesArraytoSend: File[] = [];
  formDataFiles = new FormData();

  fnUploadFile(event): void {
    let tableComponent: TableFormComponent = this.sithecSuiteService_tools.fnGetFormElement('form-new-Group', 'table');
    var input = document.createElement("input");
    input.type = 'file';
    input.accept = '.pdf,.jpg,.png,.jpeg',
      input.multiple = true
    input.onchange = (event: any) => {
      this.formData = new FormData()
      /*un archivo*/
      /* let input = event.path[0];
       this.file = input.files[0]
       let selectedFiles = (event.target || event.srcElement).files;*/
      /*multiples archivos*/


      let selectedFiles = (event.target || event.srcElement).files;
      Object.keys(selectedFiles).forEach(data => {
       
        let aux = {
          _nombre: selectedFiles[data].name
        }

        this.fileSend.push(aux)
        tableComponent.fnSetOptions(this.fileSend);//ingresa el nuevo archivo
        this.filesArraytoSend.push((selectedFiles)[data])

      })
    
     
    };
    input.click()

    event.fnOffSpinner(true);
  }



  fnCreateFormDataFiles(): void {
    let i: number = 0;
    this.filesArraytoSend.forEach(res => {
      this.formDataFiles.append("file", res, res.name)
      i++;
    })
  }







}
