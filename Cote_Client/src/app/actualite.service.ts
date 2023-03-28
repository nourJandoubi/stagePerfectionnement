import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actualite } from './actualite';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  
  private baseUrl = 'http://localhost:3000/api/actualite/';
  // loggedUser: string;
  // isloggedIn: boolean;
  constructor(private http: HttpClient) { }
  getActualite(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getoneActualite(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createActualite(h:Actualite): Observable<any> {
    return this.http.post(`${this.baseUrl}`,h);
  }
  updateActualite(id: string, actualite: Actualite): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`,actualite);
  }
  deleteActualite(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  
}


