import { Component, OnInit, ViewChild } from '@angular/core';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
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
import { S2TableFormModel } from 'src/app/form-component/models/s2-table-form.model';
import { SithecConfig } from '../form-dialog/sithec.config.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MessageConfig } from '../message-dialog/message-dialog.model';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { HeadersFormModel } from 'src/app/form-component/models/s2-headers-form.model';
import { UserService } from 'src/app/services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  schoolsArraySelect: any[]

  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;
  data: any
  
  displayedColumns: string[] = ['position', 'name','action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;


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
    private activateRouter: ActivatedRoute,
    private dialog: MatDialog,
    private userService: UserService,
    private classService: ClassService,
    
  ) { }
  num_idEdit: string
  ngOnInit(): void {
    this.getSchools()
    this.num_idEdit = this.activateRouter.snapshot.params.id;
    this.getGroupById()
    this.getUserStudents()
    this.getUserTeachers();
    this.getClass()
    this.dataSource.sort = this.sort;
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

  getUserStudents(): void {
    this.userService.getStudents().toPromise()
      .then((res:any) => {
        this.arrayAuxStudent = res.item
        console.log('done');

      })
      .catch((err) => {
        console.log(err)
      })
  }

  
  getUserTeachers(): void {
    this.userService.getTeachers().toPromise()
      .then((res:any) => {
        this.arrayAuxTeacher = res.item
        console.log('done');

      })
      .catch((err) => {
        console.log(err)
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
        event.fnOffSpinner(true);

      })
      .catch((err) => {
        event.fnOffSpinner(false);
      })
  }





  /*formulario*/

  headersTable = [
  
    {
      _title: "Nombre de usuario ",
      _columName: "user_name",
      _filter: true
    } as HeadersFormModel,
    {
      _title: "Nombre",
      _columName: "name",
      _filter: false
    } as HeadersFormModel,
    {
      _title: "Apellido",
      _columName: "last_name",
      _filter: false
    } as HeadersFormModel,
  ]


  arrayAuxStudent = [
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
  
  arrayAuxTeacher = [
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




  async fnNewClass() {

    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var formGroup_newClass: FormGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      teachers: new FormControl(null, Validators.required),
      students: new FormControl(null, Validators.required),
      user: new FormControl(null),
      group: new FormControl(null)
    });

    var config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: formGroup_newClass,
        _id: 'form-new-class',
        _groups: [
          {
            _nameAs: 'new-class',
            _items: [
              {
                _control: "group",
                _config: {
                  _id: "group",
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
                    _checkboxHeader: false,
                    _label: "Profesores",
                    _limit: 1,
                    _primaryKey: '_id',
                    _options: this.arrayAuxTeacher,
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
                    _primaryKey: '_id',
                    _options: this.arrayAuxStudent,
                    _tableHeaders: this.headersTable,
                    _columns: this.inputColumns,

                  } as S2TableFormModel
                } as S2FormField
              } as S2FormGroupItemModel,

            ],

          } as S2FormGroupModel,
        ],

        _saveButton: {
          _text: 'Crear clase',
          _resetOnSuccess: true,
          _validToSend: true
        } as S2ButtonModel
      } as S2SettingsFormGeneratorModel;
    config.tool = 'form-generator';

    config.fnOnSubmit = (event, ref: MatDialogRef<any>) => {
     

     let classToSend: any = event.data['new-class'];
     classToSend.user = this.data.user,
     classToSend.group =this.num_idEdit
      ref.close(1)
       this.classService.create(classToSend).toPromise()
         .then((res) => {
           ref.close(1)
           this.getClass()
         })
         .catch((err) => {
           ref.close(-1)
         })
    }

    config.title = "Crear clase"
    config.message = "Crea clases para tu grupo!"

    this.dialog.open(FormDialogComponent, { data: config, panelClass: "dialog-fuchi", height: "600px" }).afterClosed()
      .toPromise()
      .then((res) => {
        if (res && res == -1) {
          var message: MessageConfig = {
            title: "Iniciar sesión",
            message: "Usuario y/o contraseña incorrecto(s)."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
        }else if(res && res == 1){
          var message: MessageConfig = {
            title: "Crear clase",
            message: "La clase se ha creado correctamente"
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
        }
      })
  }

  getClass():void{
    this.classService.getAll().toPromise()
    .then((res:any)=>{
      this.dataSource = new MatTableDataSource(res.item);

    })
    .catch((rej)=>{
      console.log(rej)
    })
  }

  deleteClass(element):void{
    console.log(element)

    this.classService.delete(element._id).toPromise()
    .then((res) => {
      if (res) {
       
        var message: MessageConfig = {
          title: "Eliminar clase ",
          message: "La clase se ha sido eliminado correctamente"
        }
        this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
        this.getClass()
      }

    })
    .catch((rej) =>{
      console.log(rej)
    })

  }







}
