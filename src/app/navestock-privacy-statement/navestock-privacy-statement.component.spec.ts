import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavestockPrivacyStatementComponent } from './navestock-privacy-statement.component';

describe('NavestockPrivacyStatementComponent', () => {
  let component: NavestockPrivacyStatementComponent;
  let fixture: ComponentFixture<NavestockPrivacyStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavestockPrivacyStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavestockPrivacyStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
