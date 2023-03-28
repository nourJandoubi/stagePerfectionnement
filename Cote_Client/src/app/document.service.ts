import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:3000/api/stuff/';
  // loggedUser: string;
  // isloggedIn: boolean;
  constructor(private http: HttpClient) { }
  getDocument(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getoneDocument(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createDocument(h:object): Observable<any> {
    return this.http.post(`${this.baseUrl}`,h);
  }
  // updateAdmin(id: string, Document: Object): Observable<Object> {
  //   return this.http.put(`${this.baseUrl}${id}`,Document);
  //}
  deleteDocument(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  
}
