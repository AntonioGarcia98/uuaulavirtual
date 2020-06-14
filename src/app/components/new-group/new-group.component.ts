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
import { School } from 'src/app/models/school.model';
import { SithecSuiteService } from 'src/app/form-component/sithec-suite.service';
import { SelectComponent } from 'src/app/form-component/controls/form-generator/form-fields/select/select.component';
import { Session } from 'protractor';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {


  schoolsArraySelect: any[]

  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;
  sessionData: Session
  constructor(
    private sessionService: SessionService,
    private groupService: GroupService,
    private schoolService: SchoolService,
    private formService: SithecSuiteService
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
    school: new FormControl(null, Validators.required)

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
    console.log(this.sessionData)
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
  }








}
