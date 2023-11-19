// src/app/app.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', isActive: true, createdAt: new Date(), updatedAt: new Date() };

  @ViewChild('updateModal') updateModal: any;

  constructor(private taskService: TaskService, private modalService: NgbModal) {}

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

  openUpdateModal(task: Task) {
    // Copy the values of the task to the newTask object
    this.newTask = { ...task };
    
    // Open the Bootstrap modal
    this.modalService.open(this.updateModal, { centered: true });
  }

  updateTask() {
    this.taskService.updateTask(this.newTask).subscribe(() => {
      this.getTasks();
      this.resetNewTask();
      this.modalService.dismissAll(); // Close the Bootstrap modal
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
