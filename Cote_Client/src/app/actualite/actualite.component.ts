import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActualiteService } from '../actualite.service';
import { AdminService } from '../admin.service';
import { DocumentService } from '../document.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actualite } from '../actualite';
import { Admin } from '../admin';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css'],
})
export class ActualiteComponent implements OnInit {
  selectedActualiteId: string;
  nom: string;
  objet: string;
  UserA: Admin;
  a: number = 1;
  totalLength: any;
  document: any;
  actualites: Actualite[] = [];
  admins: Admin[] = [];
  actualite: Actualite;
  modifierActualiteForm: FormGroup = new FormGroup({});
  actualiteForm: FormGroup = new FormGroup({});
  user: string = String(sessionStorage.getItem('_id'));
  nomA: string = sessionStorage.getItem('loggedUser');
  prenomA: string = sessionStorage.getItem('prenom');
  matriculeA: number = Number(sessionStorage.getItem('matricule'));
  loginA: string = sessionStorage.getItem('login');
  motDePasseA: string = sessionStorage.getItem('motDePasse');
  idA: string = sessionStorage.getItem('_id');
  adminA: boolean = Boolean(sessionStorage.getItem('isAdmin'));

  connected: boolean = Boolean(sessionStorage.getItem('isloggedIn'));

  constructor(
    private documentservice: DocumentService,
    private route: Router,
    private _snackBar: MatSnackBar,
    public adminservice: AdminService,
    private actualiteservice: ActualiteService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actualiteservice.getActualite().subscribe((data) => {
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      console.log(data);
      this.actualites = data;
      this.totalLength = data.length;
      console.log(this.actualites);
    });
    this.UserA = new Admin(
      this.matriculeA,
      this.nomA,
      this.prenomA,
      this.loginA,
      this.motDePasseA,
      this.idA,
      '',
      this.adminA
    );
    console.log(this.UserA)
    this.actualiteForm = this.formBuilder.group({
      objet: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      corps: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      lien: ['', [Validators.required]],
      date: [],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      user:[this.UserA],
    });

    this.modifierActualiteForm = this.formBuilder.group({
      objet: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      corps: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      lien: ['', [Validators.required]],
      date: [],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      user: [this.UserA],
    });
  }
  public get objete() {
    return this.actualiteForm.get('objet');
  }
  public get corpse() {
    return this.actualiteForm.get('corps');
  }
  public get liene() {
    return this.actualiteForm.get('lien');
  }
  public get datee() {
    return this.actualiteForm.get('date');
  }
  public get descriptione() {
    return this.actualiteForm.get('description');
  }
  //2eme
  public get objetm() {
    return this.modifierActualiteForm.get('objet');
  }
  public get corpsm() {
    return this.modifierActualiteForm.get('corps');
  }
  public get lienm() {
    return this.modifierActualiteForm.get('lien');
  }
  public get datem() {
    return this.modifierActualiteForm.get('date');
  }
  public get descriptionm() {
    return this.modifierActualiteForm.get('description');
  }
  reloadCurrentRoute() {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      location.reload();
    });
  }
  SuccessSnackBar(message: string) {
    this._snackBar.open(message, 'SUCCEEDED', { duration: 600 });
  }
  ErrorSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', { duration: 600 });
  }
  retourAcceuilAvecAnnulation() {
    this.ErrorSnackBar("l'ajout d'une actualité est  annulé ! ");
  }
  ajouterActualite() {
    var today = new Date();
    this.actualiteForm.value['date'] = today;
    this.actualiteservice
      .createActualite(this.actualiteForm.value)
      .subscribe((response) => {
        this.SuccessSnackBar('lactualite est bien ajoutée ');
        location.reload();
      });
  }

  modifierActualite(id: any) {
    this.selectedActualiteId = id;
    this.actualiteservice.getoneActualite(id).subscribe((data) => {
      this.actualite = data;

      this.modifierActualiteForm = this.formBuilder.group({
        objet: [
          this.actualite.objet,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
        ],
        corps: [
          this.actualite.corps,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
        ],
        lien: [this.actualite.lien, [Validators.required]],
        date: [this.actualite.date],
        description: [
          this.actualite.description,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
        ],
        user:[this.UserA],
      });

      console.log(this.actualite);
    });
  }
  confirmerModificationActualite() {
    this.actualiteservice
      .updateActualite(
        this.selectedActualiteId,
        this.modifierActualiteForm.value
      )
      .subscribe((data) => {
        let pos = this.actualites.findIndex(
          (l) => l._id == this.selectedActualiteId
        );
        this.actualites[pos] = this.modifierActualiteForm.value;
        this.actualites[pos]._id = this.selectedActualiteId;
        this.SuccessSnackBar("l'actualite est modifiée");
      });
  }

  supprimerActualite(id: any) {
    this.actualiteservice
      .deleteActualite(id)
      .subscribe(
        () => (this.actualites = this.actualites.filter((l) => l._id != id))
      );
    this.SuccessSnackBar("l'actualite est supprimée");
  }
}
