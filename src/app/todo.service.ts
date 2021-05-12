import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(apiUrl);
  }
}


