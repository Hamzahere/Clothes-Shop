import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {State } from '../store/pages';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http:HttpClient) { }

  get() {
    return this.http.get<State[]>('http://localhost:3000/New_Arrivals_Front');
  }
}
