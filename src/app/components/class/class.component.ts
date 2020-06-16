import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  
  classArray =[]
  constructor(
    private router: Router,
    private classService:ClassService,
    private activateRouter: ActivatedRoute,
  ) { }
  idGroup:string
  ngOnInit(): void {
    this.idGroup = this.activateRouter.snapshot.params.id;
    this.getClassByGroup()
  }

  seleccionClase(clase: any){
    console.log(clase)
   this.router.navigate([ '/course', clase._id  ]);
  }

 

  getClassByGroup():void{
    this.classService.getClassByGroup(this.idGroup).toPromise()
    .then((res:any)=>{
      console.log(res)
     this.classArray = res.item

    })
    .catch((rej)=>{
      console.log(rej)
    })
  }


}
