import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

}
