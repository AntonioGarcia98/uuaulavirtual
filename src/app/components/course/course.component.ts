import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  material = [{
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
  }
  ]
  
  @ViewChild('activities') activities: MatAccordion;


  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }


  showActivity(activity: any) {
    this.dialog.open(ActivityComponent, {data : activity, panelClass: "dialog-fuchi", width: "800px"})
  }
}
