import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  
  clases =[{
    _foto:"https://img.icons8.com/plasticine/2x/classroom.png",
    _nombre:"Matematicas",
    _cuerpo:" Impartida por Juna en el semestre mayo-junio",
    _id:1,
  },
  {
    _foto:"../../../assets/students.png",
    _nombre:"Bases de Datos Distribuidas",
    _cuerpo:" Impartida por Maria en el semestre mayo-junio",
    _id:2,
  },
  {
    _foto:"https://i.pinimg.com/originals/df/d4/3a/dfd43a46c0cd6ab31adf3ca830b15506.jpg",
    _nombre:"Ingenieria de software",
    _cuerpo:" Impartida por Luis en el semestre mayo-junio",
    _id:3,
  }
]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  seleccionClase(clase: any){
    console.log(clase)
   this.router.navigate([ '/course', clase._id  ]);
  }


}
