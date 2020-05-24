import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  
  clases =[{
    _foto:"https://image.flaticon.com/icons/svg/42/42974.svg",
    _nombre:"Matematicas",
    _cuerpo:" Impartida por Juna en el semestre mayo-junio",
    _id:1,
  },
  {
    _foto:"https://image.flaticon.com/icons/svg/42/42974.svg",
    _nombre:"Bases de Datos Distribuidas",
    _cuerpo:" Impartida por Maria en el semestre mayo-junio",
    _id:2,
  },
  {
    _foto:"https://image.flaticon.com/icons/svg/42/42974.svg",
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
