import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { GestioneUtentiComponent } from './gestione-utenti/gestione-utenti.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'gestioneUtenti', component: GestioneUtentiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
