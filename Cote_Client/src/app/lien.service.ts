import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lien } from './lien';

@Injectable({
  providedIn: 'root',
})
export class LienService {
  private baseUrl = 'http://localhost:3000/api/lien/';
  // loggedUser: string;
  // isloggedIn: boolean;
  constructor(private http: HttpClient) {}
  getLien(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getoneLien(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createLien(h: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, h);
  }
  updateLien(id: string, Document: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`, Document);
  }
  deleteLien(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
