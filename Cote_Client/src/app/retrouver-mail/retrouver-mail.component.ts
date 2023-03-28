import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-retrouver-mail',
  templateUrl: './retrouver-mail.component.html',
  styleUrls: ['./retrouver-mail.component.css'],
})
export class RetrouverMailComponent implements OnInit {
  hidden: boolean = true;
  hidden1: boolean = true;
  visible: boolean = false;
  visible1: boolean = true;
  motdepasse: boolean = true;
  admin: Admin;
  retrouverMailForm: FormGroup = new FormGroup({});
  verifierCodeForm: FormGroup = new FormGroup({});
  restaurermotdepasseForm: FormGroup = new FormGroup({});
  constructor(
    private adminservice: AdminService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.retrouverMailForm = this.formBuilder.group({
      login: [''],
    });

    this.verifierCodeForm = this.formBuilder.group({
      code: [''],
    });
    this.restaurermotdepasseForm = this.formBuilder.group({ motDePasse: [''] });
  }

  SuccessSnackBar(message: string) {
    this._snackBar.open(message, 'SUCCEEDED', { duration: 12000 });
  }
  ErrorSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', { duration: 6000 });
  }
  envoyerMail() {
    this.adminservice
      .sendMail(this.retrouverMailForm.value['login'])
      .subscribe((response) => {
        console.log(this.retrouverMailForm.value['login']);
        console.log(response);
        this.admin = response;
        //  this.SuccessSnackBar('lactualite est bien ajoutée ');
        //  location.reload();
        if (response == null) {
          this.hidden = false;
        }
        if (response != null) {
          this.hidden = true;
          this.visible = this.visible1;
          this.visible1 = false;
          this.adminservice
            .sendCode(response)
            .subscribe((data) => console.log(data));
        }
      });
  }
  verifierCode() {
    const admin = new Admin(
      0,
      '',
      '',
      this.retrouverMailForm.value['login'],
      '',
      null,
      this.verifierCodeForm.value['code'],
      null
    );
    this.adminservice.VerifyCode(admin).subscribe((res) => {
      console.log(res);
      if (res.message == 'you can reset') {
        this.visible1 = true;
        this.motdepasse = false;
      } else {
        this.hidden1 = true;
      }
    });
  }
  annulerCode() {
    this.route.navigate(['../accueil']);
  }
  restaurermotdepasse() {
    const admin = new Admin(
      0,
      '',
      '',
      this.retrouverMailForm.value['login'],
      this.restaurermotdepasseForm.value['motDePasse'],
      null,
      this.verifierCodeForm.value['code'],
      null
    );
    const id = this.admin._id;
    this.adminservice.updateAdmin(id, admin).subscribe();
    this.route.navigate(['../login']);
  }
}
