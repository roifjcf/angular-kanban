import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModal } from './task-modal';

describe('NewTaskModal', () => {
  let component: TaskModal;
  let fixture: ComponentFixture<TaskModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
