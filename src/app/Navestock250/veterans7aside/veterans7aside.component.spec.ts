import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Veterans7asideComponent } from './veterans7aside.component';

describe('Veterans7asideComponent', () => {
  let component: Veterans7asideComponent;
  let fixture: ComponentFixture<Veterans7asideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Veterans7asideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Veterans7asideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
