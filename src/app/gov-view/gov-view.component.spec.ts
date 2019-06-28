import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovViewComponent } from './gov-view.component';

describe('GovViewComponent', () => {
  let component: GovViewComponent;
  let fixture: ComponentFixture<GovViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
