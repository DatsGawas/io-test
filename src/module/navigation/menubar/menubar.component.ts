/**
 * Created by ketangote on 12/8/17.
 */

/*
Component Name : Amexio menubar
Component Selector : <amexio-menu>
Component Description : Menu bar component show menu list on top.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';
import { DeviceQueryService } from '../../services/device/device.query.service';
@Component({
  selector: 'amexio-menu',
  template: `
    <div class="menu-container">
      <div class="menubar">
        <ul class="menuheader">
          <li class="menulink">{{label}}</li>
          <div>
            <li *ngFor="let node of data" class="menulink">
              <a (click)="onClick(node)"  (mouseover)="onMouseOver($event)">
                <amexio-nav-icon *ngIf="node.icon" [customclass]="node.icon"></amexio-nav-icon>&nbsp;&nbsp;{{node.text}}</a>
              <!--<i *ngIf="node.icon" [ngClass]="node.icon" aria-hidden="true"></i>-->
              <ng-container *ngIf="(node.children && node.children[0].children)">

                <div *ngIf="(node.children && node.children.length>0)" class="menu-content"
                     [ngClass]="{'menu-content-display':node.expand,
                     ' menu-content-left': (node.children && node.children.length>3),'menu-right':xposition}">
                  <ul class="menu-content-cols">

                    <li class="col-menu-nodes"
                        [ngClass]="{'col-menu-nodes-fixed': (node.children && node.children.length<4),
                      'col-menu-nodes-percentage': (node.children && node.children.length>3)}"
                        *ngFor="let subnode of node.children">
                      <div class="content">
                        <div *ngIf="(subnode.text && subnode.text.length>0)" class="menu-links-header">
                          <amexio-nav-icon *ngIf="subnode.icon" [customclass]="subnode.icon"></amexio-nav-icon>&nbsp;&nbsp;{{subnode.text}}
                          <!--<i *ngIf="subnode.icon" [ngClass]="subnode.icon" aria-hidden="true"></i>-->
                        </div>
                        <div *ngIf="subnode.image" style="padding: 10px;">
                          <img [attr.src]="subnode.image">
                        </div>
                        <ul class="menu-content-cols">
                          <li *ngFor="let subinnernode of subnode.children" class="menulinks">
                            <div *ngIf="subinnernode.image" style="padding: 10px;">
                              <img [attr.src]="subinnernode.image">
                            </div>
                            <!--<i *ngIf="subinnernode.icon" class="fa fa-ravelry"
                            aria-hidden="true"></i>-->
                            <amexio-nav-icon *ngIf="subinnernode.icon" key="menubar_ravelry">
                            </amexio-nav-icon>
                            &nbsp;&nbsp;{{subinnernode.text}}{{subinnernode.template}}
                          </li>
                        </ul>
                      </div>
                    </li>

                  </ul>
                </div>

              </ng-container>


              <ng-container *ngIf="(node.children && !node.children[0].children)">
                <div class="menu-content" [ngClass]="{'menu-content-display':node.expand}">
                  <ul class="menu-content-cols">
                    <li class="col-menu-nodes col-menu-nodes-fixed">
                      <div class="content">
                        <ul class="menu-content-cols">
                          <li *ngFor="let subnode of node.children" class="menulinks">
                            <div *ngIf="subnode.image" style="padding: 10px;">
                              <img [attr.src]="subnode.image">
                            </div>
                            <!--<i *ngIf="subnode.icon" class="fa fa-ravelry" aria-hidden="true"></i>-->
                            <amexio-nav-icon *ngIf="subnode.icon"
                                             key="menubar_ravelry"></amexio-nav-icon>&nbsp;&nbsp;{{subnode.text}}
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </ng-container>


            </li>
          </div>

        </ul>
      </div>
    </div>

  `, providers: [CommonDataService],
})
export class AmexioMenuBarComponent implements OnInit {

  /*
Properties
name : data
datatype : any
version : 4.0 onwards
default : none
description : Local data for menubar.
*/
  @Input() data: any[];

  /*
Properties
name : label
datatype : any
version : 4.0 onwards
default : none
description : label to menubar
*/
  @Input() label: any;

  /*
  Properties
  name : http-url
  datatype : string
  version : 4.0 onwards
  default : none
  description : REST url for fetching datasource.
  */
  @Input('http-url') httpurl: string;

  /*
Properties
name : http-method
datatype : string
version : 4.0 onwards
default : none
description : Type of HTTP call, POST,GET.
*/
  @Input('http-method') httpmethod: string;

  /*
Properties
name : data-reader
datatype : string
version : 4.0 onwards
default : none
description : Key in JSON datasource for records
*/
  @Input('data-reader') datareader: string;

  /*
Events
name : nodeClick
datatype : any
version : none
default : none
description : Fire when menubar bar click.
*/
  @Output() nodeClick: any = new EventEmitter<any>();

  xposition = false;

  responseData: any;

  expand: boolean;

  constructor(public matchMediaService: DeviceQueryService, public dataService: CommonDataService) {
    this.expand = false;
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    }
  }

  onClick(node: any) {
    if (this.matchMediaService.IsPhone() || this.matchMediaService.IsTablet()) {
      for (const i of 'length') {
        if (this.data[i] === node) {
          this.data[i].expand = !this.data[i].expand;
        } else {
          this.data[i].expand = false;
        }
      }
    }
    this.nodeClick.emit(node);

  }

  setData(httpResponse: any) {
    // Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of 'length') {
        responsedata = responsedata[dr[ir]];
      }
    }
    this.data = httpResponse;
  }

  onMouseOver(event: any) {
    if (!(this.matchMediaService.IsPhone() || this.matchMediaService.IsTablet())) {
      if ((this.matchMediaService.browserWindow().innerWidth - event.clientX) < 200) {
        this.xposition = true;
      } else {
        this.xposition = false;
      }
    } else {
      this.xposition = false;
    }
  }
}
