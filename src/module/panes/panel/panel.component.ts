/**
 * Created by pratik on 14/12/17.
 */
/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */

/*
Component Name : Amexio panel
Component Selector : <amexio-panel>
Component Description : Panel provides an easy way to organize big forms by
grouping the fields in panel
*/
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AmexioPanelHeaderComponent} from './../panel/panel.header.component';

@Component({
  selector: 'amexio-panel', template: `
    <div #id class="panel-box"  (contextmenu)="loadContextMenu({event:$event,ref:id})" >
      <ng-container *ngIf="header">
        <div class="panel-accordion" #btn1 >
          <amexio-toolbar>
            <amexio-toolbar-item position-left>
                <amexio-label size="small" >
                {{title}}
                </amexio-label>
            </amexio-toolbar-item>
            <amexio-toolbar-item position-right>
                <ng-content select="amexio-panel-header"></ng-content>
            </amexio-toolbar-item>
            <amexio-toolbar-item position-right >
                <i [class]="iconclassKey" aria-hidden="true" (click)="onTabClick(btn1)"></i>
            </amexio-toolbar-item>
          </amexio-toolbar>
    </div>
  </ng-container>
      <ng-container *ngIf="expanded">
        <div class="panel-panel" [style.max-height.px]="height">
          <ng-content></ng-content>
        </div>
      </ng-container>

    <span [ngStyle]="contextStyle">
    <ul *ngIf="flag" class="context-menu-list" [ngClass]="{'dropdown-up' : posixUp}">
      <li (click)="onContextNodeClick(itemConfig)" class="context-menu-list-items"
      [ngStyle]="{'cursor': itemConfig.disabled ? 'not-allowed':'pointer'}"
        [ngClass]="{'context-menu-separator':itemConfig.seperator}" *ngFor="let itemConfig of contextmenu">
        <em [ngStyle]="{'padding-left': itemConfig.icon ? '5px':'19px'}" [ngClass]="itemConfig.icon"></em>
        <span style="white-space: nowrap;display: inline ; padding-left:5px">{{itemConfig.text}}
        </span>
      </li>
    </ul>
  </span>
    </div>

  `,
})

export class AmexioPanelComponent implements OnInit {

  /*
Properties
name : title
datatype : string
version : 4.0 onwards
default :
description : Title for panel.
*/
  @Input() title: any;

  /*
Properties
name : header
datatype :  boolean
version : 4.0 onwards
default : true
description : 	Enable/Disabled header.
*/
  @Input() header: boolean;
    /*
Properties
name : paneltitle
datatype :  boolean
version : 4.0 onwards
default : true
description : 	Enable/Disabled header.
*/
 // @Input() paneltitle: boolean;
  /*
Properties
name : expanded
datatype :  boolean
version : 4.0 onwards
default : false
description : Pane will expand or collapse based on the boolean.
*/
  @Input() expanded: boolean;

  /*
Properties
name : height
datatype :  number
version : 4.0 onwards
default : none
description : Height of panel must be in px ex.100, 250..
*/
  @Input() height: number;

  /*
 Properties
 name :  context-menu
 datatype : string
 version : 5.0.1 onwards
 default :
 description : Context Menu provides the list of menus on right click.
 */
  @Input('context-menu') contextmenu: any[];

  @Input() parentRef: any;
  /*
Events
name : onClick
datatype : none
version : none
default : none
description : Fires the on accordion pane click event.
*/
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @Output() nodeRightClick: any = new EventEmitter<any>();

  @Output() rightClick: any = new EventEmitter<any>();

  iconclassKey: string;

  flag: boolean;

  posixUp: boolean;

  rightClickNodeData: any;

  contextStyle: any;

  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };

  private faFaIconUPCss = 'fa fa-caret-up';

  private faFaIconDownCss = 'fa fa-caret-down';

  ngOnInit() {
    if (!this.header) {
      this.expanded = true;
    }
    this.iconclassKey = this.expanded ? this.faFaIconUPCss : this.faFaIconDownCss;
    if (this.height) {
      return this.height;
    }
  }

  onTabClick(btn: any) {
    btn.classList.toggle('active-accordion');
    if (this.iconclassKey === this.faFaIconDownCss) {
      this.iconclassKey = this.faFaIconUPCss;
    } else if (this.iconclassKey === this.faFaIconUPCss) {
      this.iconclassKey = this.faFaIconDownCss;
    }
    this.expanded = !this.expanded;
    this.onClick.emit();
  }

  getContextMenu() {
    if (this.contextmenu && this.contextmenu.length > 0) {
      this.flag = true;
    }
  }

  getListPosition(elementRef: any): boolean {
    const height = 240;
    if ((window.screen.height - elementRef.getBoundingClientRect().bottom) < height) {
      return true;
    } else {
      return false;
    }
  }
  loadContextMenu(rightClickData: any) {
    console.log('check data', rightClickData);
    this.mouseLocation.left = rightClickData.event.clientX;
    this.mouseLocation.top = rightClickData.event.clientY;
    this.getContextMenu();
    this.posixUp = this.getListPosition(rightClickData.ref);
    rightClickData.event.preventDefault();
    rightClickData.event.stopPropagation();
    this.rightClickNodeData = rightClickData.data;
    this.contextStyle = this.getContextMenuStyle();
    this.nodeRightClick.emit(rightClickData);
  }

  onContextNodeClick(itemConfig: any) {
    if (!itemConfig.disabled) {
      const obj = {
        menuData: itemConfig,
        NodeData: this.rightClickNodeData,
      };
      this.rightClick.emit(obj);
    }
  }

  @HostListener('document:click')
  onWindowClick() {
    this.flag = false;
  }

  @HostListener('document:scroll')
  onscroll() {
    this.flag = false;
  }

  getContextMenuStyle() {
    return {
      'cursor': 'default',
      'position': 'fixed',
      'display': this.flag ? 'block' : 'none',
      'left': this.mouseLocation.left + 'px',
      'top': this.mouseLocation.top + 'px',
      'box-shadow': '1px 1px 2px #000000',
      'width': '15%',
    };
  }
}
