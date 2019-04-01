import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGroundsComponent } from './all-grounds.component';

describe('AllGroundsComponent', () => {
  let component: AllGroundsComponent;
  let fixture: ComponentFixture<AllGroundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllGroundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
