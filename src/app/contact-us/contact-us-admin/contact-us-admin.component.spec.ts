import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsAdminComponent } from './contact-us-admin.component';

describe('ContactUsAdminComponent', () => {
  let component: ContactUsAdminComponent;
  let fixture: ComponentFixture<ContactUsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
