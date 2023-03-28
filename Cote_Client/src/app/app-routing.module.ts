import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilAdminComponent } from './acceuil-admin/acceuil-admin.component';

import { AcceuilComponent } from './acceuil/acceuil.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { ErrorComponent } from './error/error.component';
import { GuardService } from './guard.service';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { RetrouverMailComponent } from './retrouver-mail/retrouver-mail.component';
///////canActivate guard
const routes: Routes = [
  { path:'accueil',component:AcceuilComponent},
  { path:'accueilAdmin',component:AcceuilAdminComponent},
  { path:'login',component:LoginComponent},
  { path:'actualite',component:ActualiteComponent},
  { path:'retrouverMail',component:RetrouverMailComponent},
  { path:'acceuilAdmin',component:AcceuilAdminComponent,canActivate: [GuardService]},
  { path:'profil',component:ProfilComponent,canActivate: [GuardService]},

  // canActivate: [GuardService]

  {path:'',redirectTo:'accueil',pathMatch:'full'},
  {path:'**',component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
