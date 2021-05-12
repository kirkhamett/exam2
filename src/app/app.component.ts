import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'exam2';
  selectedUserId: number = 0;
  statusFilter: boolean = false;

  totalComplete: number = 0;
  totalIncomplete: number = 0;

  listing = [];  // should be an interface of todo item
  userIds = [];

  /**
   * class constructor
   */
   constructor(private todoService: TodoService) { 

  }

   /**
   * initialize
   */
  ngOnInit(): void {
    this.getAll();    
        
  }

   /**
   * fetch data from server/api 
   */
  getAll(): void {
    this.todoService.getAll()
      .subscribe(
        data => {
          this.listing = data;   
          this.getSummary();     
          this.getUserIds();        
        },
        error => {
          console.log(error);
        });
  }  

  /**
   * get total number of complete/incomplete items
   */
  getSummary(): void {
    if (this.listing) {
      this.totalComplete = 0;
      this.totalIncomplete = 0;
      for (let item of this.listing) {
        if (item.completed) {
          ++this.totalComplete;
        }
        else {
          ++this.totalIncomplete;
        }
      }
    }
  }

  /**
   * get unique user ids
   */
  getUserIds(): void {
    if (this.listing) {
      // add blank option as default
      this.userIds.push('');
      for (let item of this.listing) {
        if (!this.userIds.includes(item.userId)) {
          this.userIds.push(item.userId);
        }
        
      }
      //console.log(this.userIds);
    }
  }

  /**
   * mark item/task as complete
   */
  markAsComplete(item: any): void {
    item.completed = true;
    this.getSummary();
  }

  /**
   * mark item/task as incomplete
   */
  markAsInComplete(item: any): void {
    item.completed = false;
    this.getSummary();
  }

  /** 
   * 
   */
  onSelect(value: number) {
    this.selectedUserId = value;
 }
}
