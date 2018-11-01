
// describe('TextInput ', () => {
//   it('true is true', () => expect(true).toBe(true));
// });
/**
 * Created by pratik on 1/12/17.
 */
import { AmexioTextInputComponent } from './textinput.component';
import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NUMBER INPUT', () => {

  let comp: AmexioTextInputComponent;
  let fixture: ComponentFixture<AmexioTextInputComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioTextInputComponent, AmexioFormIconComponent],
      providers: [IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioTextInputComponent);
    comp = fixture.componentInstance;

    it('true is true', () => expect(true).toBe(true));
  });


  it('initialize innervalue', () => {
    comp.value = 'sagfaf';
    expect(comp['innerValue']).toEqual(comp.value);
  });

  //wrking 1- set errormsg
  it('set errormsg', () => {
    comp.errormsg = 'data incorect';
    expect(comp.helpInfoMsg).toEqual('data incorect<br/>');
  });

  it('get errormsg', () => {
    //  comp.errormsg='data incorect';
    expect(comp.errormsg).toEqual(comp._errormsg);
  });

  //working 2 get minerrormsg
  it('get minerrormsg', () => {
    // comp.minerrormsg="";
    comp.minerrormsg = 'trial';
    expect(comp.minerrormsg).toEqual(comp._minerrormsg);
  })

  //get pattern
  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  })

  //set pattern
  // it('set pattern', () => {

  //   let obj = new RegExp(comp.pattern);
  //   expect(comp.value).not.toEqual(null);
  //   expect(comp.regEx).toEqual(obj);
  //  })

  it('register on change', () => {
    let fn: any;
    comp.registerOnChange(fn);
    expect(comp['onChangeCallback']).toEqual(fn);
  })


  it('register on touched', () => {
    let fn: any;
    comp.registerOnTouched(fn);
    expect(comp['onTouchedCallback']).toEqual(fn);
  })
  it('writeValue()', () => {
    comp.writeValue(fixture);
    expect(comp.value).toEqual(fixture);
  });


  //on focus()
  it('on focus()', () => {
    //comp.showToolTip=true;
    let flag = true;
    comp.onFocus();
    expect(comp.showToolTip).toEqual(flag);
  })


  it('on blur()', () => {
    comp.onblur(fixture);
    expect(comp.showToolTip).toEqual(false);
    expect(comp.componentClass).toEqual(comp.validateComponent(fixture));

  })
  it('getCssClass()', () => {
    comp.getCssClass();
    expect(comp.getCssClass).toBeUndefined;
  });
  //working 3 get maxerrormsg
  it('get _maxerrormsg', () => {
    comp.maxerrormsg = 'trial';
    expect(comp.maxerrormsg).toEqual(comp._maxerrormsg);
  })
  it('get helpinfomsg', () => {
    comp.helpInfoMsg = "test";
    expect(comp.helpInfoMsg).toEqual(comp.helpInfoMsg);
  })
  it('set minerroromsg', () => {
    comp.helpInfoMsg = "test";
    comp.minerrormsg = 'min error';
    comp.helpInfoMsg = comp.helpInfoMsg + '<b>Min Length<b/>: ' + comp.minerrormsg + '<br/>';
    expect(comp.helpInfoMsg).toContain(comp.minerrormsg);
  });
  it('check for isValid', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  });
  it('noInnerValue()', () => {
    comp.noInnerValue(fixture);
    expect(comp.noInnerValue).toBeUndefined;
  });
  it('otherValidation()', () => {
    comp.otherValidation(fixture);
    expect(comp.otherValidation(fixture.nativeElement)).toBeUndefined;
  });

  // it('set validation flag', () => {
  //   //comp.helpInfoMsg="test";
  //   let flag: boolean;
  //   comp.setValidationFlag(flag);
  //   expect(comp.isValid).toEqual(flag);
  // })



  //set maxerrormsg


  //set minerrormsg
  // it('set minerrormsg', () => {
  //   let testvalue = comp._minerrormsg;
  //   comp.minerrormsg = testvalue;
  //   comp.helpInfoMsg="testMin value: <br/>";
  //   let str = comp.helpInfoMsg + 'Min value: ' + comp.value+ '<br/>';
  //   expect(comp.helpInfoMsg).toBe(str);
  // });


});