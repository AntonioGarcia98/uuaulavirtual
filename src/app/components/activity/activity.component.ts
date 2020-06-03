import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {


  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

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

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
