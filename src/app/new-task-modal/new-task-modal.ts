import { Component, input, output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NewTaskInterface } from '../../type';

@Component({
  selector: 'app-new-task-modal',
  imports: [ FormsModule ],
  templateUrl: './new-task-modal.html',
  styleUrl: './new-task-modal.scss'
})
export class NewTaskModal {
  isModalOpen = input<boolean>(false);
  closeModalEvent = output<boolean>();
  addTaskEvent = output<NewTaskInterface>();
  newTaskTitle = '';
  newTaskDescription = '';

  cancel() {
    this.closeModalEvent.emit(false);
  }

  confirm() {
    if (this.newTaskTitle === "") {
      alert("Task title cannot be empty!");
      return;
    }
    if (this.newTaskDescription === "") {
      alert("Task description cannot be empty!");
      return;
    }
    this.closeModalEvent.emit(false);
    this.addTaskEvent.emit({
      title: this.newTaskTitle,
      description: this.newTaskDescription
    });
  }
}
