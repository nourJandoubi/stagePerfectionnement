import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import * as bcrypt from 'bcrypt';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  
id:string
 nom:String;
 actif:boolean=true;
 admin:Admin
 matricule:string;
 login:string
 prenom:string
 motDePasse:string
 ProfilForm: FormGroup = new FormGroup({});
 motdepasseForm: FormGroup = new FormGroup({});
  constructor(public adminservice:AdminService,private formBuilder: FormBuilder,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.nom=sessionStorage.getItem('loggedUser');
    this.prenom=sessionStorage.getItem('prenom');
    this.matricule=sessionStorage.getItem('matricule');
    this.login=sessionStorage.getItem('login');
    this.motDePasse=sessionStorage.getItem('motDePasse');
    this.id=sessionStorage.getItem('_id');

    console.log(this.nom);
    this.ProfilForm = this.formBuilder.group(
      {
        nom:[this.nom,[Validators.required,Validators.minLength(4), Validators.maxLength(20)]],
       matricule:[this.matricule ,[Validators.required, Validators.pattern('[0-9]{8}')]],
       login:[this.login,[Validators.required, , Validators.pattern('^[a-z0-9._%+-]+@attijarileasing+\\.com.tn$')]],
       motDePasse:["" ,[
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)]]


      })
      this.motdepasseForm = this.formBuilder.group(
        {
          
          motDePasse1:[],
  
  
        })

   
  }
  public get matriculee() { return this.ProfilForm.get('matricule'); }
  public get nome() { return this.ProfilForm.get('nom'); }
  public get logine() { return this.ProfilForm.get('login'); }
  public get motDePassee() { return this.ProfilForm.get('motDePasse'); }
  
  SuccessSnackBar(message: string) {
    this._snackBar.open(message, 'SUCCEEDED', { duration: 3000 });
  }
  ErrorSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', { duration: 3000 });
  }
  modifierInfo()
  {

  }
  verifierMotDePasse(id:string)
  {   this.admin=new Admin(Number(this.matricule),this.nom,this.prenom,this.login,this.motdepasseForm.value['motDePasse1'])
    this.adminservice.logIn(this.admin).subscribe(   (response) => {
  
      this.adminservice.updateAdmin(id,this.ProfilForm.value).subscribe(
        data=>this.SuccessSnackBar('vos données personnelles sont modifiés '));
        console.log(response)
      
      this.adminservice.getOneAdmin(id).subscribe(res=>this.adminservice.SaveData(res));  
    },
    (error) => {
      console.log(error);
      this.ErrorSnackBar('votre ancien mot de passe est incorrecte vous ne pouvez pas modifier vos données ');
    })
    
      
    }
}