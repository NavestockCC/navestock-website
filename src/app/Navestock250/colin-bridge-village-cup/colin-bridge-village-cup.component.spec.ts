import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColinBridgeVillageCupComponent } from './colin-bridge-village-cup.component';

describe('ColinBridgeVillageCupComponent', () => {
  let component: ColinBridgeVillageCupComponent;
  let fixture: ComponentFixture<ColinBridgeVillageCupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColinBridgeVillageCupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColinBridgeVillageCupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
