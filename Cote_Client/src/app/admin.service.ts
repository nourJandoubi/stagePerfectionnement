import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/api/auth/';
  loggedUser: any;
  isloggedIn: boolean;
  motDePasse: string;
  matricule: any;
  prenom: any;
  login: any;
  isadmin:any;
  _id: any;
  constructor(private http: HttpClient) {}
  getAdmin(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getOneAdmin(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  logIn(Admin: object): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, Admin);
  }
  addAdmin(admin: Admin): Observable<any> {
    return this.http.post(`${this.baseUrl}signup`, admin);
  }
  updateAdmin(id: string, Admin: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`, Admin);
  }
  deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  sendMail(login: string): Observable<any> {
    return this.http.get(`${this.baseUrl}mail/${login}`);
  }

  sendCode(admin: Admin): Observable<any> {
    return this.http.post(`${this.baseUrl}request`, admin);
  }
  VerifyCode(admin: Admin): Observable<any> {
    return this.http.post(`${this.baseUrl}code`, admin);
  }
  sendNotification(login: string): Observable<any> {
    return this.http.get(`${this.baseUrl}notification/${login}`);
  }

  SaveData(user: Admin) {
    this.loggedUser = user.nom;
    this.prenom = user.prenom;
    this.isloggedIn = true;
    this.motDePasse = user.motDePasse;
    this.matricule = user.matricule;
    this.login = user.login;
    this._id = user._id;
    this.isadmin = user.isAdmin;
    sessionStorage.setItem('loggedUser', this.loggedUser);
    sessionStorage.setItem('prenom', this.prenom);
    sessionStorage.setItem('motDePasse', this.motDePasse);
    sessionStorage.setItem('matricule', this.matricule);
    sessionStorage.setItem('isloggedIn', String(this.isloggedIn));
    sessionStorage.setItem('login', this.login);
    sessionStorage.setItem('_id', this._id);
    sessionStorage.setItem('isAdmin', this.isadmin);

    console.log(sessionStorage.getItem('isAdmin'));
  }
  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined;
    sessionStorage.removeItem('loggedUser');
    sessionStorage.removeItem('prenom');
    sessionStorage.removeItem('motDePasse');
    sessionStorage.removeItem('matricule');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('isloggedIn');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('_id');
  }
}
