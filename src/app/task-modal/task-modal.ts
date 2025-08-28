import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskInterface, TaskInterface, TaskModalType } from '../../type';

@Component({
  selector: 'app-task-modal',
  imports: [ FormsModule ],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss'
})
export class TaskModal {

  /** General */
  isModalOpen = input<boolean>(false);
  mode = input<TaskModalType>("new");
  closeModalEvent = output<boolean>();

  /** Add a new task */
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

  /** Modify an existing task */
  modifyTaskEvent = output<TaskInterface>();
  deleteTaskEvent = output<TaskInterface>();
  taskToEdit = input<TaskInterface>();
  currTaskTitle = "";
  currTaskDescription = "";

  constructor() {
    effect(() => {
      const task = this.taskToEdit();
      if (task) {
        this.currTaskTitle = task.title;
        this.currTaskDescription = task.description;
      }
    });
  }

  delete() {
    this.closeModalEvent.emit(false);
    const task = this.taskToEdit();
    if (!task) { return; }
    this.deleteTaskEvent.emit(task);
  }

  save() {
    this.closeModalEvent.emit(false);
    const task = this.taskToEdit();
    if (!task) { return; }

    this.modifyTaskEvent.emit({
      id: task.id,
      title: this.currTaskTitle,
      description: this.currTaskDescription
    });
  }

}
