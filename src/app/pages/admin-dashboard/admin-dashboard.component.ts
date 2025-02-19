import { iPageAble } from './../../interfaces/i-page-able';
import { iTicket, iTicketSummaryDTO } from './../../interfaces/i-ticket';
import { TicketService } from './../../services/ticket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  options = [
    { label: 'Ricevuti', value: 'RICEVUTO' },
    { label: 'In esecuzione', value: 'IN_ESECUZIONE' },
    { label: 'Completati', value: 'COMPLETATO' },
    { label: 'Cancellati', value: 'CANCELLATO' },
  ];

  currentPage: number = 0;
  currentSize: number = 12;
  pageable!: iPageAble;
  tickets: iTicket[] = [];
  stats!: iTicketSummaryDTO;

  status: string[] = ['RICEVUTO', 'IN_ESECUZIONE', 'COMPLETATO', 'CANCELLATO'];
  listSize: number[] = [6, 12, 24, 36, 48, 60];

  date?: string;
  startDate?: string;
  endDate?: string;

  statusTicket!: string;

  constructor(private ticketSvc: TicketService) {}

  ngOnInit() {
    this.onload();

    this.ticketSvc.getStats().subscribe((res) => {
      if (!res) return;
      this.stats = res;
    });
  }

  onload(): void {
    this.ticketSvc
      .getTicket(
        this.currentPage,
        this.currentSize,
        this.statusTicket,
        this.date,
        this.startDate,
        this.endDate
      )
      .subscribe((res) => {
        console.log(res);
        this.tickets = res.content as iTicket[];
        this.pageable = res;
      });
  }

  editStatus(id: number, status: string): void {
    this.ticketSvc.editTicket(id, status).subscribe({
      next: () => {
        this.onload();
      },
      error: (error) => {
        console.error(`Failed to update ${id} ticket:`, error);
      },
    });
  }

  isChange(newStatus: string, status: string): boolean {
    return newStatus !== status;
  }

  onOptionChange(value: string): void {
    this.statusTicket = value;
    this.onload();
  }

  resetStatus(): void {
    this.statusTicket = '';
    this.onload();
  }

  resetDataEsatta() {
    this.date = '';
  }

  resetData() {
    this.startDate = '';
    this.endDate = '';
  }

  incrementa() {
    if (
      this.currentPage < this.pageable?.totalPages &&
      this.currentPage + 1 != this.pageable?.totalPages
    ) {
      this.currentPage++;
      this.onload();
    }
  }

  decrementa() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.onload();
    }
  }
}
