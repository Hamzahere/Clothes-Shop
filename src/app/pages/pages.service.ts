import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pages } from './store/pages';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http:HttpClient) { }

  get() {
    return this.http.get<Pages[]>('http://localhost:3000/books');
  }
}
