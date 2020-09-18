import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseFormComponent } from './newcourseform.component';

describe('NewcourseformComponent', () => {
  let component: NewCourseFormComponent;
  let fixture: ComponentFixture<NewCourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCourseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
