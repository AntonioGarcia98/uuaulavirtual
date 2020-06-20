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
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MessageConfig } from '../message-dialog/message-dialog.model';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { DeliveryModel } from '../activity/delivery.model';
import { DeliveryService } from 'src/app/services/delivery.service';
import { Session } from 'inspector';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  text:any = []
  sessionData: Session
  constructor(
    private dialog: MatDialog,
    private deliveryService: DeliveryService,
    private sessionService: SessionService,
    private userService: UserService,
    private loader: LoaderService,
  ) { }

  ngOnInit(): void {
    this.loader.show()
    this.getPost()
    this.subscribeSession()
  }
  subscribeSession(): void {
    this.sessionService._session.subscribe(data => {
      this.sessionData = data
      console.log(this.sessionData)
    })
  }

  async getPost() {
    try{
      var res:any = await this.deliveryService.getAll().toPromise()
      console.log(res.item)

      this.text=res.item
      
      for (let i = 0; i < this.text.length; i++) {
        console.log(this.text[i].user)
        var autorID = this.text[i].user
        var autor : any = await this.userService.get(autorID).toPromise()
        this.text[i]['autor'] = autor.item[0].user_name;
      }
      console.log(this.text)
    } catch(err){
      console.error(err);
    }finally{
      this.loader.hide()
    }


  }



  addComment(title: string): void {
    this.text[0].comments.push({

      person: "Antonio Garcia",
      comment: title

    })
  }

  fnNewPost(): void {

    var inputColumns: S2BootstrapColumnsModel = { _lg: 12, _xl: 12, _md: 12, _xs: 12, _sm: 12 } as S2BootstrapColumnsModel;

    var formGroup_newPost: FormGroup = new FormGroup({
      title: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
      comments: new FormControl(null),
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
              {
                _control: "comments",
                _config: {
                  _id: "comments",
                  _type: "text",
                  _input: {
                    _label: 'Comentarios (opcional)',
                    _placeholder: 'Ingresa un comentario',
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
      postNew.user = this.sessionData['user']._id
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
          var message: MessageConfig = {
            title: "Post creado",
            message: "Post creado correctamente."
          }
          this.dialog.open(MessageDialogComponent, { data: message, panelClass: "dialog-fuchi" });
          this.getPost()
        }
      })
  }

}
