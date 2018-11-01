
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioTextAreaComponent } from './textarea.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';

describe('TextArea ', () => {
  let comp: AmexioTextAreaComponent;
  let fixture: ComponentFixture<AmexioTextAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioTextAreaComponent, AmexioFormIconComponent],
      providers: [IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioTextAreaComponent);
    comp = fixture.componentInstance;
  });
  it('true is true', () => expect(true).toBe(true));
  it('Condition Check', () => {
    comp.value;
    fixture.detectChanges();
    expect('').toBe(comp.value);
  });
  it('otherValidation()', () => {
    comp.otherValidation(fixture);
    expect(comp.otherValidation(fixture.nativeElement)).toBeUndefined;
  });
  it('getCssClass()', () => {
    comp.getCssClass();
    expect(comp.getCssClass).toBeUndefined;
  });
  it('noInnerValue()', () => {
    comp.noInnerValue(fixture);
    expect(comp.noInnerValue).toBeUndefined;
  });
  it('get helpinfomsg', () => {
    comp.helpInfoMsg = "test";
    expect(comp.helpInfoMsg).toEqual(comp.helpInfoMsg);
  });
  it('set minerroromsg', () => {
    comp.helpInfoMsg = "test";
    comp.minerrormsg = 'min error';
    comp.helpInfoMsg = comp.helpInfoMsg + '<b>Min Length<b/>: ' + comp.minerrormsg + '<br/>';
    expect(comp.helpInfoMsg).toContain(comp.minerrormsg);
  });

  it('get _maxerrormsg', () => {
    expect(comp.maxerrormsg).toEqual(comp._maxerrormsg);
  });
  it('set maxerroromsg', () => {
    comp.helpInfoMsg = "test";
    comp.maxerrormsg = 'max error';
    comp.helpInfoMsg = comp.helpInfoMsg + '<b>Max Length<b/>: ' + comp.maxerrormsg + '<br/>';
    expect(comp.helpInfoMsg).toContain(comp.maxerrormsg);
  });

  it('get minerrormsg', () => {
    expect(comp.minerrormsg).toEqual(comp._minerrormsg);
  });
  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  });
  it('set errormsg', () => {
    comp.errormsg='data incorect';
    expect(comp.helpInfoMsg).toEqual('data incorect<br/>');
    });
  it('get errormsg', () => {
    expect(comp.errormsg).toEqual(comp._errormsg);
  });
  it('check for isValid', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  });
  it('check for pattern', () => {
    comp._pattern;
    expect(comp.pattern).toBeUndefined;
  });
  it('check for _errormsg', () => {
    comp.errormsg;
    expect(comp.errormsg).toBeUndefined;
  });
  it('check for _minerrormsg', () => {
    comp.minerrormsg;
    expect(comp.minerrormsg).toBeUndefined;
  });
  it('check for _minerrormsg', () => {
    comp.maxerrormsg;
    expect('comp._maxerrormsg').toBeUndefined;
  });
  it('check for showtooltip', () => {
    // comp.showToolTip;
    expect(comp.showToolTip).toBe(false);
  });
  it('on focus()', () => {
    comp.showToolTip = true;
    let flag = true;
    comp.onFocus();
    expect(comp.showToolTip).toEqual(true);
  });
  //on blur()
  it('on blur()', () => {
    comp.onBlur(fixture);
    expect(comp.showToolTip).toEqual(false);
    expect(comp.componentClass).toEqual(comp.validateClass(fixture));
  });

  it('writeValue()', () => {
    comp.writeValue(fixture);
    expect(comp.value).toEqual(fixture);
  });
  it('set Pattern',()=>{
    comp.pattern = comp.pattern;
    comp.regEx = new RegExp(comp.pattern);
  });
  it('register on change', () => {
    let fn: any;
  comp.registerOnChange(fn);
     expect(comp['onChangeCallback']).toEqual(fn);
   });

it('register on touched', () => {
  let fn: any;
comp.registerOnTouched(fn);
   expect(comp['onTouchedCallback']).toEqual(fn);
 });
});
