import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { 
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop'

import { TaskInterface } from '../type';
import { NewTaskInterface } from '../type';

import { Task } from "./task/task";
import { NewTaskModal } from './new-task-modal/new-task-modal';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Task,
    CdkDropList,
    CdkDrag,
    NewTaskModal
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('angular-kanban');
  isModalOpen = false;


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



  editTask(list: string, task: TaskInterface): void {}

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

}
