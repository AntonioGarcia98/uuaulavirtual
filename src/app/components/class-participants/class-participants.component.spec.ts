import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassParticipantsComponent } from './class-participants.component';

describe('ClassParticipantsComponent', () => {
  let component: ClassParticipantsComponent;
  let fixture: ComponentFixture<ClassParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
