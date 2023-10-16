import { Task } from 'src/app/model/task';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService){

  }

  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTasks().subscribe({next : res=>{
      this.taskArr = res;
    },
     error : err=>{
        alert("Unable to fetch tasks")
      }})
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({next : res=>{
      this.ngOnInit;
      this.addTaskValue = ''
    },error:err=>{
      alert(err);
    }})
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({ next: res => {
      this.ngOnInit;
    },error : err=>{
      alert("Failed to update the tasks : "+err);
    }})
  }

  deleteTask(etask : Task){
    this.crudService.deleteTask(etask).subscribe({next : res=>{
      this.ngOnInit; 
    },error : err=>{
      alert("Unable to delete the task : "+err)
    }})
  }

  call(etask : Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

}
