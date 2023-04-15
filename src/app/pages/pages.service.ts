import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {State } from '../store/pages';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PagesService {

  getAllProductsRoute = 'items'
  constructor(private http:HttpClient) { }

  get() {
    return this.http.get<State[]>(`${environment.baseURL}items`);
  }

  checkout(data){
    return this.http.post<any>(`${environment.baseURL}checkout`, data);
  }
  getSingleProduct(actionObj:any) {
    console.log("actionObj",actionObj);
    let copyObj = {...actionObj}
    
    let Obj = Object.keys(copyObj);
    console.log("Obj==>",Obj);
    
    delete copyObj[Obj[Obj.length-1]];
    let values = Object.values(copyObj);
    let string = values.join("");
    console.log(string);
    
    return this.http.get<State[]>(`${environment.baseURL}product?id=`+string);
  }

  submitOrder(){
    
  }
}
