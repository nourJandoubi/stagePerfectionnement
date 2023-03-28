import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-acceuil-admin',
  templateUrl: './acceuil-admin.component.html',
  styleUrls: ['./acceuil-admin.component.css'],
})
export class AcceuilAdminComponent implements OnInit {
  employes: Admin[] = [];
  isAdmin: boolean = false;
  user: string = String(sessionStorage.getItem('_id'));
  employeForm: FormGroup = new FormGroup({});
  motDePasse: string;
  constructor(
    public adminservice: AdminService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.adminservice
      .getAdmin()
      .subscribe(
        (data) => (this.employes = data.filter((l) => l._id != this.user))
      );
    this.employeForm = this.formBuilder.group({
      matricule: [0,[Validators.required, Validators.pattern('[0-9]{8}')]],
      nom: ['',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ],],
      prenom: ['',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ],],
      login: ['',[
        Validators.required
        
      ],],
      motDePasse: ['',[
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(4),
        Validators.maxLength(20),
      ],],
      code: [],
      isAdmin: [false],
    });
  }
  public get matriculee() { return this.employeForm.get('matricule'); }
  public get prenome() { return this.employeForm.get('prenom'); }
  public get nome() { return this.employeForm.get('nom'); }
  public get logine() { return this.employeForm.get('login'); }
  public get motDePassee() { return this.employeForm.get('motDePasse');
}
  
  SuccessSnackBar(message: string) {
    this._snackBar.open(message, 'SUCCEEDED', { duration: 12000 });
  }
  ErrorSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', { duration: 6000 });
  }
  supprimerEmploye(id) {
    this.adminservice
      .deleteAdmin(id)
      .subscribe(
        () => (this.employes = this.employes.filter((l) => l._id != id))
      );
    location.reload();
    this.SuccessSnackBar("l'employé est supprimé");
  }
  ajouterEmploye() {
    console.log(this.employeForm.value);
    this.adminservice.addAdmin(this.employeForm.value).subscribe((response) => {
      {
        this.SuccessSnackBar("l'employé est bien ajouté");
        location.reload();
      }
    });
  }
}
