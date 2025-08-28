import { Component, input, output } from '@angular/core';

import { TaskInterface, TaskModalType } from '../../type';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.scss',
  standalone: true,
})
export class Task {
  task = input<TaskInterface | null | undefined>();
  setTaskToEditEvent = output<TaskInterface | null | undefined>(); // edit the task
  editModalTypeEvent = output<TaskModalType>();
  setOpenModalEvent = output<boolean>();

  handleDoubleClick() {
    if (this.task()) {
      this.setTaskToEditEvent.emit(this.task());
      this.editModalTypeEvent.emit("edit");
      this.setOpenModalEvent.emit(true);
    }
  }
}