import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ErrorComponent } from './error/error.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarousselComponent } from './caroussel/caroussel.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ProfilComponent } from './profil/profil.component';
import { ActualiteComponent } from './actualite/actualite.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { RetrouverMailComponent } from './retrouver-mail/retrouver-mail.component';
import { AcceuilAdminComponent } from './acceuil-admin/acceuil-admin.component';
import { DocumentComponent } from './document/document.component';



@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    LoginComponent,
    MenuComponent,
    ErrorComponent,
    CarousselComponent,
    
    ProfilComponent,
    ActualiteComponent,
    RetrouverMailComponent,
    AcceuilAdminComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    MatInputModule,
    MatIconModule,
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
