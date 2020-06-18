import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { SessionService } from 'src/app/services/session.service';
import { GroupService } from 'src/app/services/group.service';

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
    private sessionService: SessionService,
    private groupService:GroupService,
  ) { }
  idGroup:string
  ngOnInit(): void {
    this.idGroup = this.activateRouter.snapshot.params.id;
    this.subscribeSession()
  }

  seleccionClase(clase: any){
    console.log(clase)
   this.router.navigate([ '/course', clase._id  ]);
  }

  string_idUser:string
  subscribeSession():void{
    this.sessionService._session.subscribe(data =>{
      if(data){
        this.string_idUser =data.user
        console.log(data.user)
        data.user.teacher?data.user.teacher.role=="ADMIN_ROLE"?this.getClassByGroup(): this.getClassByGroupByIdUser(data.user._id):this.getClassByGroupByIdUser(data.user._id)
        console.log("id user", this.string_idUser)
      }
      
    })
  }

 
  getClassByGroupByIdUser(idUser:any):void{
    this.classService.getActivitiesByClassByUser(this.idGroup, idUser).toPromise()
    .then((res:any)=>{
      console.log(res)
     this.classArray = res.item

    })
    .catch((rej)=>{
      console.log(rej)
    })
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
