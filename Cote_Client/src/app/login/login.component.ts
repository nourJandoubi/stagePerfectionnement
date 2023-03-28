import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private adminservice: AdminService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  formAdmin: FormGroup;
  ngOnInit(): void {
    this.formAdmin = this.fb.group({
      login: [''],
      motDePasse: [''],
    });
  }
  SuccessSnackBar(message: string) {
    this._snackBar.open(message, 'SUCCEEDED', { duration: 3000 });
  }
  ErrorSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', { duration: 3000 });
  }
  login() {
    console.log(this.formAdmin.value);

    this.adminservice.logIn(this.formAdmin.value).subscribe(
      (response) => {
        this.SuccessSnackBar('Connected Successfully');

        this.adminservice.getOneAdmin(response.adminId).subscribe((res) => {
          console.log(res);
          this.adminservice.SaveData(res);
          this.router.navigate(['../accueil']);
          location.replace('http://localhost:4200/accueil');
        });
      },
      (error) => {
        console.log(error);
        this.ErrorSnackBar('Connection Error');
      }
    );
  }
}
