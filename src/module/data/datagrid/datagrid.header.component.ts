
import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-datagrid-header', template: `
    <ng-content></ng-content>
  `,
})

export class AmexioDataGridHeaderComponent implements OnInit {

    /*
Properties
name :padding
datatype : string
version : 4.2 onwards
default : left
description : padding for header.
*/
@Input() padding: string;
  constructor() {
  }

  ngOnInit() {
  }
}
