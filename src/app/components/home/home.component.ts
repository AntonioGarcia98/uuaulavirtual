import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  text =[{
    title:"Titlulo",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
    text:" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, ut rerum deserunt corporisducimus at, deleniti ea alias dolor reprehenderit sit vel. Incidunt id illum doloribus,consequuntur maiores sed eligendi Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, ut rerum deserunt corporis" +
    "ducimus at, deleniti ea alias dolor reprehenderit sit vel. Incidunt id illum doloribus,consequuntur maiores sed eligendi"
    +"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, ut rerum deserunt corporis ducimus at, deleniti ea alias dolor reprehenderit sit vel. Incidunt id illum doloribus,consequuntur maiores sed eligendi",
    comments:[
      {
        person:"Mirna Pere",
        comment:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        person:"Mirna Pere",
        comment:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
      },
      {
        person:"Mirna Pere",
        comment:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        person:"Mirna Pere",
        comment:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
      }
    ]

  }
  
  ]
  constructor() { }

  ngOnInit(): void {
  }

  addComment(title:string):void{
    this.text[0].comments.push({
      
        person:"Antonio Garcia",
        comment:title
      
    })
  }

}
