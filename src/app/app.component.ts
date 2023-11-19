import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', isActive: true, createdAt: new Date(), updatedAt: new Date() };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask() {
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.getTasks();
      this.resetNewTask();
    });
  }

  updateTask(task: Task) {
    // Assuming you want to update the existing task with the new values
    task.title = this.newTask.title;
    task.description = this.newTask.description;

    this.taskService.updateTask(task).subscribe(() => {
      this.getTasks();
      this.resetNewTask();
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }

  private resetNewTask() {
    this.newTask = { id: 0, title: '', description: '', isActive: true, createdAt: new Date(), updatedAt: new Date() };
  }
}