import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  user: string = String(sessionStorage.getItem('loggedUser'));
  isadmin:string = String(sessionStorage.getItem('isadmin'));
  connected: boolean = Boolean(sessionStorage.getItem('isloggedIn'));
  id: string = String(sessionStorage.getItem('_id'));

  constructor(public adminservice: AdminService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.isadmin);
   console.log(this.id);
    // console.log(this.connected);
  }
  logout() {
    this.adminservice.logout();
    this.connected = false;
    this.router.navigate(['../login']);
  }
}
