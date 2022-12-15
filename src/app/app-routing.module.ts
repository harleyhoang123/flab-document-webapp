import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import {PageNotFoundComponent} from "./_components/page-not-found/page-not-found.component";
import {ErrorComponent} from "./_components/error/error.component";

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const documentModule = () => import('./document/document.module').then(x => x.DocumentModule);


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'document', loadChildren: documentModule, canActivate: [AuthGuard] },
  {path: 'errors', component: ErrorComponent},
  {path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
