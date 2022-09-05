import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeFormComponent } from './fe-form.component';

describe('FeFormComponent', () => {
  let component: FeFormComponent;
  let fixture: ComponentFixture<FeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
