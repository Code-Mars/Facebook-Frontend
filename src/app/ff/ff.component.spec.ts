import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfComponent } from './ff.component';

describe('FfComponent', () => {
  let component: FfComponent;
  let fixture: ComponentFixture<FfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FfComponent]
    });
    fixture = TestBed.createComponent(FfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
