import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

const todoListStorageKey = 'Todo_List';

const defaultTodoList = [{ title: 'Add a todo!', completed: false }];

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  todoList: TodoItem[] = [];

  constructor(private storageService: StorageService) {
    this.todoList = storageService.getData(todoListStorageKey) || defaultTodoList;
   }

  getTodoList() {
    return this.todoList;
  }

  addItem(item: TodoItem) {
    this.todoList.push(item);
    this.saveList();
  }

  updateItem(item: TodoItem, changes: any) {
    const index = this.todoList.indexOf(item);
    console.log(index);
    this.todoList[index] = {...item, ...changes};
    console.log(this.todoList[index]);
    this.saveList();
  }

  deleteItem(item: TodoItem) {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }
}
