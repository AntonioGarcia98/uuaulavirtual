import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  material = [{
    _titulo: "Activity 1",
    _subtitulo: "Matematicas",
    _cuerpo: " orem ipsum dolor sit amet consectetur adipisicing elit. Nulla, totam repellat, illo enim,quisquam incidunt nihil eveniet esse repudiandae perspiciatis voluptas a id vitae delectus! Magnam voluptatibusdolorum perferendis voluptatum",
  },
  {
    _titulo: "Material 2",
    _subtitulo: "Bases de Datos Distribuidas",
    _cuerpo: " orem ipsum dolor sit amet consectetur adipisicing elit. Nulla, totam repellat, illo enim,quisquam incidunt nihil eveniet esse repudiandae perspiciatis voluptas a id vitae delectus! Magnam voluptatibusdolorum perferendis voluptatum",
    _id: 2,
  },
  {
    _titulo: "Resource 3",
    _subtitulo: "Ingenieria de software",
    _cuerpo: " Impartida por Luis en el semestre mayo-junio",
    _id: 3,
  }
  ]
  
  @ViewChild('activities') activities: MatAccordion;


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  selectActivity(activity: any) {
    console.log(activity)
    console.log(activity._id)
    this.router.navigate(['activity', activity._id]);
  }

  
  /* showAll(){
    this.activities.openAll()
  }

  hideAll(){
    this.activities.closeAll()
  } */

}
