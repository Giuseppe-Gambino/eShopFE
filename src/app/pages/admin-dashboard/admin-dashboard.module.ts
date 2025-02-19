import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import { GestioneUtentiComponent } from './gestione-utenti/gestione-utenti.component';

@NgModule({
  declarations: [AdminDashboardComponent, GestioneUtentiComponent],
  imports: [CommonModule, AdminDashboardRoutingModule, FormsModule],
})
export class AdminDashboardModule {}
