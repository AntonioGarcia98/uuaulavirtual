import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  
  classArray =[{
    _foto:"https://img.icons8.com/plasticine/2x/classroom.png",
    name:"Matematicas",
    _cuerpo:" Impartida por Juna en el semestre mayo-junio",
    _id:1,
  },
  {
    _foto:"../../../assets/students.png",
    name:"Bases de Datos Distribuidas",
    _cuerpo:" Impartida por Maria en el semestre mayo-junio",
    _id:2,
  },
  
]
  constructor(
    private router: Router,
    private classService:ClassService
  ) { }

  ngOnInit(): void {
    this.getClass()
  }

  seleccionClase(clase: any){
    console.log(clase)
   this.router.navigate([ '/course', clase._id  ]);
  }

  getClass():void{
    this.classService.getAll().toPromise()
    .then((res:any)=>{
      console.log(res)
     this.classArray = res.item

    })
    .catch((rej)=>{
      console.log(rej)
    })
  }


}
