/**
 * Created by ketangote on 11/21/17.
 */

/*

Component Name : Amexio Typeahead Input
Component Selector :  <amexio-typeahead>
Component Description : Type Ahead Component provides a power type ahead on the
text field where users entry is provided with a filtered result.

*/
import {
  Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, OnInit, Output, Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonDataService } from '../../services/data/common.data.service';

const noop = () => {
};

@Component({
  selector: 'amexio-typeahead',
  templateUrl: './typeahead.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioTypeAheadComponent), multi: true,
  }],
})
export class AmexioTypeAheadComponent implements ControlValueAccessor, OnChanges, OnInit {
  /*
   Properties
   name : field-label
   datatype : string
   version : 4.0 onwards
   default :
   description : The label of this field
   */
  @Input('field-label') fieldlabel: string;
  /*
   Properties
   name : allow-blank
   datatype : string
   version : 4.0 onwards
   default :
   description : Sets if field is required
   */
  @Input('allow-blank') allowblank: boolean;
  /*
   Properties
   name : data
   datatype : any
   version : 4.0 onwards
   default :
   description : Local data for dropdown.
   */
  _data: any;
  componentLoaded: boolean;
  @Input('data')
  set data(value: any) {
    this._data = value;
    if (this.componentLoaded) {
      this.setData(this._data);
    }
  }
  get data(): any {
    return this._data;
  }
  /*
   Properties
   name : data-reader
   datatype : string
   version : 4.0 onwards
   default :
   description : Key in JSON datasource for records
   */
  @Input('data-reader') datareader: string;
  /*
   Properties
   name : http-method
   datatype : string
   version : 4.0 onwards
   default :
   description : Type of HTTP call, POST,GET.
   */
  @Input('http-method') httpmethod: string;
  /*
   Properties
   name : http-url
   datatype : string
   version : 4.0 onwards
   default :
   description : REST url for fetching datasource.
   */
  @Input('http-url') httpurl: string;
  /*
   Properties
   name : display-field
   datatype : string
   version : 4.0 onwards
   default :
   description : Sets key inside response data to display.
   */
  @Input('display-field') displayfield: string;

  @Input('value-field') valuefield: string;
  /*
   Events
   name : onBlur
   datatype : any
   version : 4.0 onwards
   default : none
   description : On blur event
   */
  @Output() onBlur: any = new EventEmitter<any>();
  /*
   Events
   name : input
   datatype : any
   version : none
   default :
   description : 	On input event field.
   */
  @Output() input: any = new EventEmitter<any>();
  /*
   Events
   name : focus
   datatype : any
   version : none
   default :
   description : On focus event field.
   */
  @Output() focus: any = new EventEmitter<any>();
  /*
   Events
   name : change
   datatype : any
   version : none
   default :
   description : On field value change event
   */
  @Output() change: any = new EventEmitter<any>();
  /*
   Events
   name : onClick
   datatype : any
   version : none
   default :
   description : On click event
   */
  @Output() onClick: any = new EventEmitter<any>();

  /*
   Properties
   name : error-msg
   datatype : none
   version : 4.0 onwards
   default : none
   description : Sets the error message
   */
  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  /*
   Properties
   name : place-holder
   datatype : string
   version : 4.0 onwards
   default :
   description : Show place-holder inside dropdown component
   */
  @Input('place-holder') placeholder: string;

  /*
   Properties
   name : icon-feedback
   datatype : boolean
   version : 4.0 onwards
   default : none
   description :
   */
  @Input('icon-feedback') iconfeedback: boolean;
  /*
   Properties
   name : font-style
   datatype : string
   version : 4.0 onwards
   default :
   description : Set font-style to field
   */
  @Input('font-style') fontstyle: string;
  /*
   Properties
   name : font-family
   datatype : string
   version : 4.0 onwards
   default :
   description : Set font-family to field
   */
  @Input('font-family') fontfamily: string;
  /*
   Properties
   name : font-size
   datatype : string
   version : 4.0 onwards
   default :
   description : Set font-size to field
   */
  @Input('font-size') fontsize: string;
  /*
   Properties
   name : has-label
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : Flag to set label
   */
  @Input('has-label') haslabel = true;
  /*
   Properties
   name : enable-popover
   datatype : string
   version : 4.0 onwards
   default :
   description : Set enable / disable popover.
   */
  @Input('enable-popover') enablepopover: boolean;

  @Input() key: any;
  /*
   Properties
   name : trigger-char
   datatype : number
   version : 4.0 onwards
   default :
   description : Sets the trigger char length
   */
  @Input('trigger-char') triggerchar: number;

  @ViewChild('rootDiv') rootDiv: any;

  maskloader = true;

  @ViewChild('dpList') dpList: any;

  @ViewChild('dropdownitems', { read: ElementRef }) public dropdownitems: ElementRef;

  posixUp: boolean;

  activeindex = 0;

  currentActive: any;

  displayValue: any = '';

  helpInfoMsg: string;

  _errormsg: string;

  isValid: boolean;

  selectedindex = 0;

  scrollposition = 30;

  showToolTip: boolean;

  @Input() disabled: boolean;

  @Output() isComponentValid: any = new EventEmitter<any>();

  responseData: any;

  previousData: any;

  viewData: any;

  filteredResult: any;

  // The internal dataviews model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  geterrormsg(): string {
    return this._errormsg;
  }

  navigateKey(event: any) {

  }

  @HostListener('document:click', ['$event.target']) @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    let parentFound = false;
    while (targetElement != null && !parentFound) {
      if (targetElement === this.element.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      this.showToolTip = false;
    }
  }

  constructor(public dataService: CommonDataService, public element: ElementRef, public renderer: Renderer2) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.placeholder && !changes.placeholder.isFirstChange()) {
      this.placeholder = changes.placeholder.currentValue;
    }
  }
  ngOnInit() {

    this.isValid = this.allowblank;
    this.isComponentValid.emit(this.allowblank);

    if (this.placeholder === '' || this.placeholder == null) {
      this.placeholder = 'Choose Option';
    }

    if (!this.triggerchar) {
      this.triggerchar = 1;
    }

    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });

    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    this.componentLoaded = true;
  }

  onKeyUp(event: any) {
    this.filteredResult = [];
    this.showToolTip = false;
    const keyword: any = event.target.value;
    if (keyword != null && keyword !== ' ' && keyword.length >= this.triggerchar) {
      const search_term = keyword.toLowerCase();
      this.viewData.forEach((item: any) => {
        if (item != null && item[this.key].toLowerCase().startsWith(search_term)) {
            this.filteredResult.push(item);
        }
      });
      if (this.filteredResult.length > 0) {
        this.showToolTip = true;
      } else {
        this.showToolTip = false;
      }
    }
    if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
      this.navigateUsingKey(event);
    }
  }

  onChange(event: any) {
    if (event != null) {
      this.value = event;
      this.change.emit(this.value);
    }

  }

  navigateUsingKey(event: any) {

    if (this.selectedindex > this.filteredResult.length) {
      this.selectedindex = 0;
    }
    if (event.keyCode === 40 || event.keyCode === 38 && this.selectedindex < this.filteredResult.length) {
      if (!this.showToolTip) {
        this.showToolTip = true;
      }
      let prevselectedindex = 0;
      if (this.selectedindex === 0) {
        this.selectedindex = 1;
      } else {
        prevselectedindex = this.selectedindex;
        this.navigateByKeyCode(event);
      }

      if (this.filteredResult[this.selectedindex]) {
        this.filteredResult[this.selectedindex].selected = true;
      }
      if (this.filteredResult[prevselectedindex]) {
        this.filteredResult[prevselectedindex].selected = false;
      }
    }

    if (event.keyCode === 13 && this.filteredResult[this.selectedindex]) {
      this.onItemSelect(this.filteredResult[this.selectedindex]);
    }

  }

  // Method to navigate by key code
  private navigateByKeyCode(event: any) {
    if (event.keyCode === 40) {
      this.selectedindex++;
      if ((this.selectedindex > 5)) {
        this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
        this.scrollposition = this.scrollposition + 30;
      }
    } else if (event.keyCode === 38) {
      this.selectedindex--;
      if (this.scrollposition >= 0 && this.selectedindex > 1) {
        this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
        this.scrollposition = this.scrollposition - 30;
      }
      if (this.selectedindex === 1) {
        this.scrollposition = 30;
      }
    }
  }

  // Methos to set data in the dropdown
  setData(httpResponse: any) {
    // Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }

    this.viewData = responsedata;

    // Set user selection
    if (this.value != null) {
      const valueKey = this.valuefield;
      const displayKey = this.displayfield;
      const val = this.value;

      this.viewData.forEach((item: any) => {
        if (item[valueKey] === val) {
          this.isValid = true;
          this.displayValue = item[displayKey];
        }
      });
    }
    this.maskloader = false;
  }

  // Method Called at item Select
  onItemSelect(row: any) {
    this.value = row[this.valuefield];
    this.displayValue = row[this.displayfield];
    this.showToolTip = false;
    this.isValid = true;
    this.isComponentValid.emit(true);
    this.onClick.emit(row);
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onblur() {
    this.onTouchedCallback();
    this.onBlur.emit(this.value);
  }

  // Method called at onFocus event
  onFocus(elem: any) {
    this.showToolTip = true;
    this.posixUp = this.getListPosition(elem);
    this.focus.emit(this.value);
  }

  // Method to position dropdown correctly
  getListPosition(elementRef: any): boolean {
    const dropdownHeight = 325; // must be same in dropdown.scss
    if (window.screen.height - (elementRef.getBoundingClientRect().bottom) < dropdownHeight) {
      return true;
    } else {
      return false;
    }
  }

  // Method called at onInput
  onInput(input: any) {
    if (!this.allowblank) {
      this.isValid = input.valid;
    }
    this.input.emit(this.value);
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return this.isValid;
  }

  // Onclick Method
  onclick() {

  }
}
