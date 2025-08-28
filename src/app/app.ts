import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { 
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop'

import { TaskInterface, TaskModalType } from '../type';
import { NewTaskInterface } from '../type';

import { Task } from "./task/task";
import { TaskModal } from './task-modal/task-modal';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Task,
    CdkDropList,
    CdkDrag,
    TaskModal
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {

  /** General */
  protected readonly title = signal('angular-kanban');

  /** Tasks */
  todo: TaskInterface[] = [
    {
      id: 1,
      title: "Build projects",
      description: "Build your dream angular projects!"
    },
    {
      id: 2,
      title: "Do chores",
      description: "No one doesn't like a clean room!"
    }
  ];

  inProgress: TaskInterface[] = [
    {
      id: 4,
      title: "Something in progress",
      description: "Something in progress Something in progress Something in progress Something in progress"
    }
  ];

  done: TaskInterface[] = [
    {
      id: 3,
      title: "Be alive",
      description: "......"
    }
  ];





  /** Modal control */
  isModalOpen = false;
  mode: TaskModalType = "new";
  taskToEdit: TaskInterface | undefined;

  handleNewTaskButtonClick() {
    this.mode = "new";
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addNewTask(newTask: NewTaskInterface) {
    // generate a unique id then add the new task to the todo list
    const existingIDs = new Set<number>([
      ...this.todo.map(t => t.id),
      ...this.inProgress.map(t => t.id),
      ...this.done.map(t => t.id),
    ]);
    const maxId = existingIDs.size > 0 ? Math.max(...existingIDs) : 0;
    const newId = maxId + 1;
    this.todo.push({
      id: newId,
      title: newTask["title"],
      description: newTask["description"],
    })
    alert("Added a new task to the todo list!");
  }

  updateTask(updatedTask: TaskInterface) {
    this.todo = this.todo.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.inProgress = this.inProgress.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.done = this.done.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
  }

  deleteTask(taskToDelete: TaskInterface) {
    this.todo = this.todo.filter(task => task.id !== taskToDelete.id);
    this.inProgress = this.inProgress.filter(task => task.id !== taskToDelete.id);
    this.done = this.done.filter(task => task.id !== taskToDelete.id);
  }





  /** Drag and drop */
  drop(event: CdkDragDrop<TaskInterface[]>) {
    // runs when the drop event finished
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }





}
