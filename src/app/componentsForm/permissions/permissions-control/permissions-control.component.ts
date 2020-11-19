import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'permissions-control',
  templateUrl: './permissions-control.component.html',
  styleUrls: ['./permissions-control.component.scss']
})
export class PermissionsControlComponent implements OnInit {

  @Input() groups: GroupModel[];
  @Input() disabled: boolean = false;
  obj: any = {};
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLoad: EventEmitter<PermissionsControlComponent> = new EventEmitter<PermissionsControlComponent>();

  constructor() { }

  bln_disableItemEvent: boolean = false;
  bln_disableGroupEvent: boolean = false;
  bln_disableAll: boolean = false;

  

  ngOnInit() {
    this.onLoad.emit(this);
    this.groups.forEach(group => {
      group._items.forEach(item => {
        this.obj[item._control] = false;
      });
    });
    this.onLoad.emit(this);
    this.onChange.emit(this.obj);
  }

  fnResetPermission(){
    this.groups.forEach(group => {
      group._items.forEach(item => {
        this.obj[item._control] = false;
      });
    });
  }

  public fnChangeGroupSelection(event, i) {
    if (this.bln_disableGroupEvent || this.bln_disableAll) {
      this.bln_disableGroupEvent = false;
      return;
    }
    this.bln_disableItemEvent = true;
    let selected: boolean = (event.srcElement || event.target).checked;
    this.groups[i]._items.forEach(item => {
      this.obj[item._control] = selected;
      let input: any = document.getElementById('cb-' + item._control);
      if (input) {
        if (input.checked != selected) {
          input.click();
          this.obj[item._control] = selected;
        }
      }
    });
    this.bln_disableItemEvent = false;
    this.onChange.emit(this.obj);
  }

  public fnChangeGroupItemSelection(event, i, j) {
    if (this.bln_disableItemEvent || this.bln_disableAll) {
      return;
    }
    let selected: boolean = (event.srcElement || event.target).checked;
    this.obj[this.groups[i]._items[j]._control] = selected;

    let equals: boolean = true;
    this.groups[i]._items.forEach(item => {
      if (this.obj[item._control] != selected) {
        equals = false;
      }
    });

    let hcb: any = document.getElementById('hcb-' + i + this.groups[i]._name)
    if (!hcb) {
      return
    }

    if (hcb.checked == false && equals && selected) {
      this.bln_disableGroupEvent = true;
      hcb.click();
    } else if (hcb.checked == true && !equals && !selected) {
      this.bln_disableGroupEvent = true;
      hcb.click();
    }
    this.onChange.emit(this.obj);
  }

  public fnLoadPermissions(permissions: any = {}) {
    this.bln_disableAll = true;
    this.groups.forEach((group, i) => {
      let markAll: boolean = true;
      group._items.forEach(item => {
        let input: any = document.getElementById('cb-' + item._control);
        if (!input) {
          return;
        }
        if (permissions[item._control] == true) {
          if (input.checked == false) {
            this.obj[item._control] = true;
            input.click();
          }
        } else {
          if (input.checked == true) {
            this.obj[item._control] = false;
            input.click();
          }
        }
        if (this.obj[item._control] != true) {
          markAll = false;
        }
      });

      let hcb: any = document.getElementById('hcb-' + i + group._name);
      if (!hcb) {
        return;
      }
      if ((markAll && hcb.checked == false) || (!markAll && hcb.checked == true)) {
        hcb.click();
      }
    });
    this.onChange.emit(this.obj);
    this.bln_disableAll = false;
  }

}

export class GroupModel {
  _name: string;
  _items: GroupItemModel[];

}

export class GroupItemModel {
  _name: string;
  _control: string;
}
