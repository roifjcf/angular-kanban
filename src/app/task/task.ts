import { Component, input, output } from '@angular/core';

import { TaskInterface } from '../../type';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.scss',
  standalone: true,
})
export class Task {
  task = input<TaskInterface | null>(null);
  edit = output<TaskInterface | null>(); // edit the task
}