import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { ActivityComponent } from '../activity/activity.component';
import { ClassService } from 'src/app/services/class.service';
import { ClassParticipantsComponent } from '../class-participants/class-participants.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  material = [/* {
    delivery_date: "20/06/2020",
    points : 10,
    title: "Activity 1",
    autor: "Juanito",
    description: " orem ipsum dolor sit amet consectetur adipisicing elit. Nulla, totam repellat, illo enim,quisquam incidunt nihil eveniet esse repudiandae perspiciatis voluptas a id vitae delectus! Magnam voluptatibusdolorum perferendis voluptatum",
    _id: 1,
  },
  {
    delivery_date: "20/06/2020",
    points : 10,
    title: "Material 2",
    autor: "Checo",
    description: " orem ipsum dolor sit amet consectetur adipisicing elit. Nulla, totam repellat, illo enim,quisquam incidunt nihil eveniet esse repudiandae perspiciatis voluptas a id vitae delectus! Magnam voluptatibusdolorum perferendis voluptatum",
    _id: 2,
  },
  {
    delivery_date: "20/06/2020",
    points : 10,
    title: "Resource 3",
    autor: "Serna",
    description: " Impartida por Luis en el semestre mayo-junio",
    _id: 3,
  } */
  ]
  
  @ViewChild('activities') activities: MatAccordion;

  string_idClass: string
  
  clasObj:any
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activateRouter: ActivatedRoute,
    private classService:ClassService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.string_idClass = this.activateRouter.snapshot.params.id;
    this.getClassById()
    this.getActivities()
  }


  
  getClassById():void{
    this.classService.get(this.string_idClass).toPromise()
    .then((res:any)=>{
      console.log(res)
      this.clasObj = res.item
      
    })
    .catch((rej)=>{
      console.error(rej)
    })
  }

  getActivities()
  {
    this.classService.getActivitiesByClass(this.string_idClass).toPromise()
    .then((res) => {
      console.log(res)
      this.material = res.item
      this.material.map(a => {
        var autorID = a.user
        this.userService.get(autorID)
        .toPromise()
        .then((autor : any) => {
          a['autor'] = autor.item.user_name;
        })  
      })
    })
    .catch((rej)=>{
      ///console.error(rej)
    })
  }

  showActivity(activity: any) {
    this.dialog.open(ActivityComponent, {data : activity, panelClass: "dialog-fuchi", width: "800px"})
  }

  
  showParticipants() {
    this.dialog.open(ClassParticipantsComponent, {data : this.clasObj, panelClass: "dialog-fuchi", width: "800px"})
  }
}
