import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { Actualite } from '../actualite';
import { ActualiteService } from '../actualite.service';
import { AdminService } from '../admin.service';
import { DocumentService } from '../document.service';
import { Lien } from '../lien';
import { LienService } from '../lien.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
})
export class AcceuilComponent implements OnInit {
  nom: string;
  document: any;
  lienUtile: Lien;
  actualites: Actualite[] = [];
  liens: Lien[] = [];
  actualiteForm: FormGroup = new FormGroup({});
  modifierLienForm: FormGroup = new FormGroup({});
  lienForm: FormGroup = new FormGroup({});
  user: string = String(sessionStorage.getItem('_id'));
  selectedLienId: string;
  connected: boolean = Boolean(sessionStorage.getItem('isloggedIn'));

  constructor(
    private documentservice: DocumentService,
    private route: Router,
    private _snackBar: MatSnackBar,
    public adminservice: AdminService,
    private actualiteservice: ActualiteService,
    private formBuilder: FormBuilder,
    private lienservice: LienService
  ) {}

  ngOnInit(): void {
    this.lienservice.getLien().subscribe((data) => {
      this.liens = data;
      console.log(data);
    });
    this.nom = sessionStorage.getItem('loggedUser');

    this.lienForm = this.formBuilder.group({
      nom: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      lien: ['', [Validators.required]],
      icone: ['', [Validators.required]],
      user: [this.user],
    });
    this.modifierLienForm = this.formBuilder.group({
      nom: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      lien: ['', [Validators.required]],
      icone: ['', [Validators.required]],
      user: [this.user]
    });
  }
  public get nome() {
    return this.lienForm.get('nom');
  }
  public get liene() {
    return this.lienForm.get('lien');
  }
  public get iconee() {
    return this.lienForm.get('icone');
  }
  //2em
  public get nomm() {
    return this.modifierLienForm.get('nom');
  }
  public get lienm() {
    return this.modifierLienForm.get('lien');
  }
  public get iconem() {
    return this.modifierLienForm.get('icone');
  }

  retourAcceuil() {
    this.SuccessSnackBar('document téléchargé');
    // location.reload();
    this.route.navigate(['../accueil']);
  }
  retourAcceuilAvecAnnulation() {
    this.SuccessSnackBar('le téléchargement du document annulé ! ');
    // location.reload();
    this.route.navigate(['../accueil']);
  }

  selectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.document = file;
    }
  }

  SuccessSnackBar(message: string) {
    this._snackBar.open(message, 'SUCCEEDED', { duration: 3000 });
  }
  ErrorSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', { duration: 3000 });
  }
  envoyerLien() {
    const formData = new FormData();

    formData.append('icone', this.document, this.document.name);
    formData.append('nom', this.lienForm.value['nom']);
    formData.append('lien', this.lienForm.value['lien']);
    formData.append('user', this.lienForm.value['user']);
    console.log('this form', this.document, this.lienForm, formData);
    // const lien = new Lien(
    //   this.lienForm.value['nom'],
    //   this.lienForm.value['lien'],
    //   this.lienForm.value['icone'],
    //   this.lienForm.value['user']
    // );
    this.lienservice.createLien(formData).subscribe((res) => {
      console.log(res);
      location.reload();
      this.retourAcceuil();
    });
  }

  supprimerLienUtile(id: string) {
    this.lienservice
      .deleteLien(id)
      .subscribe(() => (this.liens = this.liens.filter((l) => l._id != id)));
    this.SuccessSnackBar('le lien utile est supprimé');
  }
  modifierLienUtile(id: any) {
    const formData = new FormData();
    sessionStorage.setItem('idLien', id);
    formData.append('icone', this.document, this.document.name);
    this.selectedLienId = id;
    this.lienservice.getoneLien(id).subscribe((data) => {
      this.lienUtile = data;

      this.modifierLienForm = this.formBuilder.group({
        nom: [
          this.lienUtile.nom,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
        ],
        lien: [this.lienUtile.lien, Validators.required],
        icone: [formData, Validators.required],
        user: [this.user]
      });

      console.log(this.lienUtile);
    });
  }
  confirmerModificationLienUtile() {
    const formData = new FormData();

    formData.append('icone', this.document, this.document.name);
    formData.append('nom', this.modifierLienForm.value['nom']);
    formData.append('lien', this.modifierLienForm.value['lien']);
    formData.append('user', this.modifierLienForm.value['user']);
    console.log('this form', this.document, this.lienForm, formData);

    this.lienservice
      .updateLien(sessionStorage.getItem('idLien'), formData)
      .subscribe((data) => {
        let pos = this.liens.findIndex((l) => l._id == this.selectedLienId);
        this.liens[pos] = data;
        this.liens[pos]._id = this.selectedLienId;
        this.SuccessSnackBar('le lien utile est modifié');
      });
  }
}
