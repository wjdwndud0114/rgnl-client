import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovsComponent } from './govs.component';

describe('GovsComponent', () => {
  let component: GovsComponent;
  let fixture: ComponentFixture<GovsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
