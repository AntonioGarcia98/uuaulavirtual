import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  material =[{
    _titulo:"Titulo 1",
    _subtitulo:"Matematicas",
    _cuerpo:" orem ipsum dolor sit amet consectetur adipisicing elit. Nulla, totam repellat, illo enim,quisquam incidunt nihil eveniet esse repudiandae perspiciatis voluptas a id vitae delectus! Magnam voluptatibusdolorum perferendis voluptatum",
  },
  {
    _titulo:"Titulo 2",
    _subtitulo:"Bases de Datos Distribuidas",
    _cuerpo:" orem ipsum dolor sit amet consectetur adipisicing elit. Nulla, totam repellat, illo enim,quisquam incidunt nihil eveniet esse repudiandae perspiciatis voluptas a id vitae delectus! Magnam voluptatibusdolorum perferendis voluptatum",
    _id:2,
  },
  {
    _titulo:"Titulo 3",
    _subtitulo:"Ingenieria de software",
    _cuerpo:" Impartida por Luis en el semestre mayo-junio",
    _id:3,
  }
]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

    
  selectActivity(activity: any){
    console.log(activity)
   this.router.navigate([ '/activity', activity._id  ]);
  }


  /*formulario*/
  inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

  formGroup_newUserType: FormGroup = new FormGroup({
    _nombre: new FormControl(null, Validators.required),
    _descripcion: new FormControl(null, Validators.required)
  });

  settings_form = {
    _formGroup: this.formGroup_newUserType,
    _id: 'form-new-usertype',
    _groups: [
      {
        _nameAs: 'user-type',
        _items: [
          {
            _control: '_nombre',
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
            _control: '_descripcion',
            _config: {
              _id: '_descripcion',
              _type: 'text',
              _input: {
                _label: 'Descripcion',
                _placeholder: 'Ingresa una descripcion',
                _columns: this.inputColumns
              } as S2InputForm
            } as S2FormField
          } as S2FormGroupItemModel
        ]
      } as S2FormGroupModel
    ],
    _saveButton: {
      _text: 'Guardar',
      _resetOnSuccess: true,
      _validToSend: true
    } as S2ButtonModel
  } as S2SettingsFormGeneratorModel

 


  fnOnSend(event) {
    console.log(event)
  }
  

}
