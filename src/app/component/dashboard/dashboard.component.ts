import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor( private crud : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr =[];
    this.getAllTask();
  }

  getAllTask(){
    this.crud.getAllTask().subscribe(res =>{
     this.taskArr = res;

    }, err =>{
      alert('unable to get list')
    })
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crud.addTask(this.taskObj)
    .subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
        }, err =>{
      alert(err)
    })
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crud.editTask(this.taskObj).subscribe(res =>{
      this.ngOnInit()
    }, err =>{
      alert('failed to update')
    })
  }

  deleteTask(etask : Task){
    this.crud.deleteTask(etask).subscribe(res =>{
      this.ngOnInit()
    }, err =>{
      alert(err)
    })
  }


  call(etask : Task)
{
  this.taskObj = etask;
  this.editTaskValue = etask.task_name
}}
