import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
})
export class AmexioChipComponent implements OnInit {
  /*
Properties
name : icon
datatype :
version : 5.3.1 onwards
default :
description : The icon is for determining of icon.
*/
  @Input('icon') icon: string;
  /*
Properties
name : label
datatype :
version : 5.3.1onwards
default :
description : The label is for determining of label.
*/
  @Input('label') label: any;
  /*
Properties
name : color
datatype :
version : 5.3.1onwards
default :
description : The color is for determining color of particular chip.
*/
  @Input ('color') color: any;
  /*
Properties
name : badge
datatype :
version : 5.3.1onwards
default :
description : The badge is for determining value of particular chip.
*/
  @Input('badge') badge: any;
  /*
Properties
name : closeable
datatype :
version : 5.3.1onwards
default :
description : The closeable is for closing particular chip.
*/
  @Input('closable') closable: false;
  /*
    Events
    name :  closeClick
    datatype : none
    version : none
    default : none
    description : It will fire only on selection of checkbox and gives you selected record data.
    */
  @Output() closeClick: any = new EventEmitter<any>();
  /*
   Events
   name :  labelClick
   datatype : none
   version : none
   default : none
   description : It will fire only on selection of checkbox and gives you selected record data.
   */
  @Output() labelClick: any = new EventEmitter<any>();
  constructor() {
  }
  onCloseClick(event: any) {
    this.closeClick.emit(this.createObject());
  }
  onLabelClick(event: any) {
    this.labelClick.emit(this.createObject());
  }
  ngOnInit() {
  }
  createObject(): object {
    const obj = {};
    obj['icon'] = this.icon;
    obj['label'] = this.label;
    obj['badge'] = this.badge;
    obj['closable'] = this.closable;
    obj['color'] = this.color;
    return obj;
  }
}
