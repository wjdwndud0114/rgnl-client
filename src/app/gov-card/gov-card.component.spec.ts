import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovCardComponent } from './gov-card.component';

describe('GovCardComponent', () => {
  let component: GovCardComponent;
  let fixture: ComponentFixture<GovCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
