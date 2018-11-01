import { AmexioSearchAdvanceComponent } from './searchadvance.component';
import { IconLoaderService } from '../../../index';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
describe('searchadvance ', () => {
  let comp: AmexioSearchAdvanceComponent;
  let fixture: ComponentFixture<AmexioSearchAdvanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioSearchAdvanceComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService ]
    });
    fixture = TestBed.createComponent(AmexioSearchAdvanceComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
   comp.advanceSearchFlag = false;
  });


    it('true is true', () => 
    expect(true).toBe(true));

    it('closeSearchForm()', () => {
      comp. closeSearchForm();
      comp.advanceSearchFlag = false;
      expect(comp.advanceSearchFlag).toEqual(false);
    });

  });


  