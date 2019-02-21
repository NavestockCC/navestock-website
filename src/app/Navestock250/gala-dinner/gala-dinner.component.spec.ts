import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaDinnerComponent } from './gala-dinner.component';

describe('GalaDinnerComponent', () => {
  let component: GalaDinnerComponent;
  let fixture: ComponentFixture<GalaDinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalaDinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalaDinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
