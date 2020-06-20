import { Component, OnInit } from '@angular/core';
import { S2BootstrapColumnsModel } from 'src/app/form-component/models/s2-bootstrap-columns.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SithecConfig } from '../form-dialog/sithec.config.model';
import { S2InputForm } from 'src/app/form-component/models/s2-input-form.model';
import { S2FormField } from 'src/app/form-component/models/s2-form-field.model';
import { S2FormGroupItemModel } from 'src/app/form-component/models/s2-form-group-item.model';
import { S2FormGroupModel } from 'src/app/form-component/models/s2-form-group.model';
import { S2ButtonModel } from 'src/app/form-component/models/s2-button.model';
import { S2SettingsFormGeneratorModel } from 'src/app/form-component/models/s2-settings-form-generator.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginRequest } from 'src/app/models/login-request.model';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MessageConfig } from '../message-dialog/message-dialog.model';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { DeliveryModel } from '../activity/delivery.model';
import { DeliveryService } from 'src/app/services/delivery.service';
import { Session } from 'inspector';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  text =[{
    title:"Titlulo",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
    message:" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, ut rerum deserunt corporisducimus at, deleniti ea alias dolor reprehenderit sit vel. Incidunt id illum doloribus,consequuntur maiores sed eligendi Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, ut rerum deserunt corporis" +
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
    ]

  }
  
  
  ]
  sessionData: Session
  constructor(
    private dialog: MatDialog,
    private deliveryService:DeliveryService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    this.getPost()
    this.subscribeSession()
  }
  subscribeSession(): void {
    this.sessionService._session.subscribe(data => {
      this.sessionData = data
      console.log(this.sessionData)
    })
  }

  getPost():void{
    this.deliveryService.getAll().toPromise()
    .then((res:any)=>{
      console.log(res)
      this.addPostArray(res.item)
    })
    .catch((rej)=>{

    })

  }

  addPostArray(info:any):void{
    info.forEach(element => {
      this.text.push(element)
    });
  }


  addComment(title:string):void{
    this.text[0].comments.push({
      
        person:"Antonio Garcia",
        comment:title
      
    })
  }

  fnNewPost():void{
    
    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var formGroup_newPost: FormGroup = new FormGroup({
      title: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    });

    var config: SithecConfig = new SithecConfig()
    config.settings =
      {
        _formGroup: formGroup_newPost,
        _id: 'form-new-post',
        _groups: [
          {
            _nameAs: 'post-new',
            _items: [
              {
                _control: 'title',
                _config: {
                  _id: 'title',
                  _type: 'text',
                  _input: {
                    _label: 'Titulo',
                    _placeholder: 'Ingresa titulo',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,
              {
                _control: 'message',
                _config: {
                  _id: 'message',
                  _type: 'text',
                  _input: {
                    _label: 'Texto',
                    _placeholder: 'Ingrese mensaje',
                    _columns: inputColumns
                  } as S2InputForm
                } as S2FormField
              } as S2FormGroupItemModel,

            ],
          } as S2FormGroupModel,
        ],

        _saveButton: {
          _text: 'Crear post',
          _resetOnSuccess: true,
          _validToSend: true
        } as S2ButtonModel
      } as S2SettingsFormGeneratorModel;
    config.tool = 'form-generator';

    config.fnOnSubmit = (event, ref: MatDialogRef<any>) => {
      console.log(event.data['post-new'])
      var postNew: DeliveryModel = new DeliveryModel()

      Object.keys(event.data['post-new']).map(k => {
        postNew[k] = event.data['post-new'][k]
      })
      postNew.user= this.sessionData['user']._id
      console.log(postNew)

      this.deliveryService.create(postNew).toPromise()
      .then((res) => {
        ref.close(1)
      })
      .catch((err) => {
        ref.close(-1)
      })


    
    }

    config.title = "Publicar un post"
    config.message = "Comparte tus conocimientos!"

    this.dialog.open(FormDialogComponent, { data: config, panelClass: "dialog-fuchi" }).afterClosed()
      .toPromise()
      .then((res) => {
        if (res && res == -1) {
          var message: MessageConfig = {
            title: "Post creado",
            message: "Post creado incorrectamente."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
        } else if (res && res == 1) {
          location.reload()
        }
      })
  }

}
