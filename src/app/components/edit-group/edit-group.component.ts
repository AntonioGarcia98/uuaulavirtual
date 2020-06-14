import { Component, OnInit } from '@angular/core';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { Session } from 'inspector';
import { SessionService } from 'src/app/services/session.service';
import { GroupService } from 'src/app/services/group.service';
import { SchoolService } from 'src/app/services/school.service';
import { SithecSuiteService } from 'src/app/form-component/sithec-suite.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2SelectFormModel } from 'src/app/form-component/models/s2-select-form.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { SelectComponent } from 'src/app/form-component/controls/form-generator/form-fields/select/select.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  schoolsArraySelect: any[]

  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;
  data:any


  

  formGroup_EditGroup: FormGroup = new FormGroup({
    _id: new FormControl(null, Validators.required),
    user: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    scholarship: new FormControl(null, Validators.required),
    grade: new FormControl(null, Validators.required),
    school: new FormControl(null, Validators.required)

  });

  settings_form = {
    _formGroup: this.formGroup_EditGroup,

    _id: 'form-edit-Group',
    _groups: [
      {
        _nameAs: 'new-group',
        _items: [
          {
            _control: "_id",
            _config: {
              _id: "_id",
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


  constructor(
    private groupService: GroupService,
    private schoolService: SchoolService,
    private formService: SithecSuiteService,
    private activateRouter: ActivatedRoute
  ) { }
  num_idEdit: string
  ngOnInit(): void {
    this.getSchools()
    this.num_idEdit = this.activateRouter.snapshot.params.id;
    this.getGroupById()
  }



  getGroupById(): void {
    this.groupService.get(this.num_idEdit).toPromise()
      .then((res: any) => {
        this.data = res.item
        this.subscribeForm()
      })
      .catch((rej) => {

      })
  }

  subscribeForm(): void {
    if (this.data) {
      this.formGroup_EditGroup.setValue({
        _id: this.data._id,
        user: this.data.user,
        name: this.data.name,
        scholarship: this.data.scholarship,
        grade: this.data.grade,
        school: this.data.school
      })
    }

  }
  getSchools(): void {
    this.schoolService.getAll().toPromise()
      .then((res: any) => {
        this.schoolsArraySelect = res.item;
        this.fnPutData()
      })
      .catch((rej) => {
        console.log(rej)
      })
  }

  fnPutData() {
    let select: SelectComponent = this.formService.fnGetFormElement('form-edit-Group', 'School');
    if (this.schoolsArraySelect.length > 0) {
      select.fnReloadOptions(this.schoolsArraySelect, 0);

    } else {
      select.fnReloadOptions([], null);
    }
  }


  fnOnSend(event): void {
    let grouptoSend = event.data['new-group']

    this.groupService.update(this.num_idEdit, grouptoSend).toPromise()
      .then((res) => {
        console.log(res)
        event.fnOffSpinner(true);

      })
      .catch((err) => {
        event.fnOffSpinner(false);
      })
  }




}
