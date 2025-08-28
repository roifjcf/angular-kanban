import { Component, signal, inject, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { 
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop'
import { AsyncPipe } from '@angular/common';
import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TaskInterface, TaskModalType } from '../type';
import { NewTaskInterface } from '../type';
import { Task } from "./task/task";
import { TaskModal } from './task-modal/task-modal';
import { addDoc, deleteDoc, doc, DocumentReference, updateDoc } from '@firebase/firestore';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Task,
    CdkDropList,
    CdkDrag,
    TaskModal,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {

  /** General */
  protected readonly title = signal('angular-kanban');


  /** Firestore init */
  firestore: Firestore = inject(Firestore);
  todoCollection;
  todo$: Observable<TaskInterface[]>;
  todo = signal<TaskInterface[]>([]);
  inProgressCollection;
  inProgress$: Observable<TaskInterface[]>;
  inProgress = signal<TaskInterface[]>([]);
  doneCollection;
  done$: Observable<TaskInterface[]>;
  done = signal<TaskInterface[]>([]);
  constructor() {
    /** Load data from firesbase */
    this.todoCollection = collection(this.firestore, 'kanban-todo');
    this.todo$ = collectionData(this.todoCollection, { idField: 'id' }) as Observable<TaskInterface[]>;
    this.todo$.subscribe(data => { this.todo.set(data); });
    this.inProgressCollection = collection(this.firestore, 'kanban-inprogress');
    this.inProgress$ = collectionData(this.inProgressCollection, { idField: 'id' }) as Observable<TaskInterface[]>;
    this.inProgress$.subscribe(data => { this.inProgress.set(data); });
    this.doneCollection = collection(this.firestore, 'kanban-done');
    this.done$ = collectionData(this.doneCollection, { idField: 'id' }) as Observable<TaskInterface[]>;
    this.done$.subscribe(data => { this.done.set(data); });


    // this.todo$.subscribe(data => console.log(data));
    // this.inProgress$.subscribe(data => console.log(data));
    // this.done$.subscribe(data => console.log(data));
  }


  
  /** Modal control */
  isModalOpen = false;
  mode: TaskModalType = "new";

  handleNewTaskButtonClick() {
    this.mode = "new";
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


  /** Firestore update */
  taskToEdit: TaskInterface | undefined;

  addNewTask(newTask: NewTaskInterface) {
    // generate a unique id then add the new task to the todo list
    this.todo.update(list => [
      ...list,
      {
        title: newTask.title,
        description: newTask.description,
      }
    ]);
    addDoc(this.todoCollection, <TaskInterface> newTask)
      .then((documentReference: DocumentReference) => {
      // the documentReference provides access to the newly created document
    });

    alert("Added a new task to the todo list!");
  }


  // helper to find which collection the task belongs to
  private getCollectionName(task: TaskInterface): string {
    if (this.todo().includes(task)) return 'todo';
    if (this.inProgress().includes(task)) return 'inprogress';
    if (this.done().includes(task)) return 'done';
    return 'todo'; // fallback
  } 

  updateTask(updatedTask: TaskInterface) {
    const updateList = (listSignal: WritableSignal<TaskInterface[]>) => {
      listSignal.update(list =>
        list.map(task => task === this.taskToEdit ? { ...updatedTask } : task)
      );
    };

    updateList(this.todo);
    updateList(this.inProgress);
    updateList(this.done);
    if (!updatedTask.id) { return; } // safety check
    const taskDocRef = doc(this.firestore, `kanban-${this.getCollectionName(updatedTask)}/${updatedTask.id}`);
  
    // Pass the updated fields as second argument
    console.log({
      title: updatedTask.title,
      description: updatedTask.description
    });
    updateDoc(taskDocRef, {
      title: updatedTask.title,
      description: updatedTask.description
    })
      .then(() => console.log('Task updated in Firestore'))
      .catch(err => console.error('Error updating task', err));
  }

  

  deleteTask(taskToDelete: TaskInterface) {
    this.todo.update(list => list.filter(task => task !== taskToDelete));
    this.inProgress.update(list => list.filter(task => task !== taskToDelete));
    this.done.update(list => list.filter(task => task !== taskToDelete));
    if (!taskToDelete.id) { return; } // safety check
    const taskDocRef = doc(this.firestore, `kanban-${this.getCollectionName(taskToDelete)}/${taskToDelete.id}`);
    deleteDoc(taskDocRef)
      .then(() => console.log('Task deleted from Firestore'))
      .catch(err => console.error('Error deleting task', err));
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
