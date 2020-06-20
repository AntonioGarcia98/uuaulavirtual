import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { SessionService } from 'src/app/services/session.service';
import { GroupService } from 'src/app/services/group.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {


  classArray = []
  idGroup: string
  string_idUser: string

  constructor(
    private router: Router,
    private classService: ClassService,
    private activateRouter: ActivatedRoute,
    private sessionService: SessionService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.idGroup = this.activateRouter.snapshot.params.id;
    this.loader.show()
    this.subscribeSession()
  }

  seleccionClase(clase: any) {

    this.router.navigate(['/course', clase._id]);
  }


  subscribeSession(): void {
    this.sessionService._session.subscribe(data => {
      if (data) {
        this.string_idUser = data.user
        data.user.teacher ? data.user.teacher.role == "ADMIN_ROLE" ? this.getClassByGroup() : this.getClassByGroupByIdUser(data.user._id) : this.getClassByGroupByIdUser(data.user._id)
      }

    })
  }


  getClassByGroupByIdUser(idUser: any): void {
    this.classService.getActivitiesByClassByUser(this.idGroup, idUser).toPromise()
      .then((res: any) => {
        this.loader.hide()
        this.classArray = res.item

      })
      .catch((rej) => {
        console.log(rej)
      })
  }

  getClassByGroup(): void {
    this.classService.getClassByGroup(this.idGroup).toPromise()
      .then((res: any) => {
        this.classArray = res.item
        this.loader.hide()

      })
      .catch((rej) => {
        console.log(rej)
      })
  }


}
