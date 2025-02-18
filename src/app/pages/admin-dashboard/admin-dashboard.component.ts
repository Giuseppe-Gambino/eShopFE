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
    { label: 'In esecuzione', value: 'IN_ESECUZION' },
    { label: 'Completati', value: 'COMPLETATO' },
    { label: 'Cancellati', value: 'CANCELLATO' },
  ];

  currentPage: number = 0;
  currentSize: number = 12;
  pageable!: iPageAble;
  tickets: iTicket[] = [];
  stats!: iTicketSummaryDTO;

  status: string[] = ['RICEVUTO', 'IN_ESECUZION', 'COMPLETATO', 'CANCELLATO'];
  listSize: number[] = [6, 12, 24, 36, 48, 60];

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
      .getPromotionRequests(this.currentPage, this.currentPage)
      .subscribe((res) => {
        console.log(res);
        this.tickets = res.content as iTicket[];
        this.pageable = res;
      });
  }

  onOptionChange(value: string): void {
    this.statusTicket = value;
    this.onload();
  }
}
