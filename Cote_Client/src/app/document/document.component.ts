import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { DocumentService } from '../document.service';
import { Document } from '../document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  documents: Document[];
  document: any;
  a: number = 1;
  totalLength:any

  documentForm: FormGroup = new FormGroup({});
  connected: boolean = Boolean(sessionStorage.getItem('isloggedIn'));
  user: string = String(sessionStorage.getItem('_id'));
  constructor(
    private documentservice: DocumentService,
    private route: Router,
    private _snackBar: MatSnackBar,
    public adminservice: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.documentservice.getDocument().subscribe((data) => {
      this.documents = data;
      this.totalLength=data.length;
      console.log(data);
    });
    console.log(this.user)

    this.documentForm = this.formBuilder.group({
      
      chemin: [''],
      docurl: ['', [Validators.required]],
      nom: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ],],
      user: [this.user],
    });
  }
  
  public get docurle() {
    return this.documentForm.get('docurl');
  }
  public get nome() {
    return this.documentForm.get('nom');
  }
  envoyerFile() {
    const formData = new FormData();

    formData.append('docurl', this.document, this.document.name);
    formData.append('nom', this.documentForm.value['nom']);
  
    formData.append('user', this.documentForm.value['user']);
    console.log('this form', this.document, this.documentForm, formData);
    // const lien = new Lien(
    //   this.lienForm.value['nom'],
    //   this.lienForm.value['lien'],
    //   this.lienForm.value['icone'],
    //   this.lienForm.value['user']
    // );
    this.documentservice.createDocument(formData).subscribe((res) => {
      console.log(res);
      location.reload();
    });
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
  retourAcceuil() {
    this.SuccessSnackBar('document téléchargé');
    // location.reload();
    this.route.navigate(['../accueil']);
  }
  supprimerDocument(id: string) {
    this.documentservice
      .deleteDocument(id)
      .subscribe(() => (this.documents = this.documents.filter((l) => l._id != id)));
    this.SuccessSnackBar('le document est supprimé');
  }
}
