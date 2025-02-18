import { iUser } from './i-user';

export interface iTicket {
  id: number;
  appUser: iUser;
  createdAt: string;
  object: string;
  description: string;
  status: StatusTicket;
}

export enum StatusTicket {
  RICEVUTO = 'RICEVUTO',
  IN_ESECUZIONE = 'IN_ESECUZION',
  COMPLETATO = 'COMPLETATO',
  CANCELLATO = 'CANCELLATO',
}

export interface iTicketDTO {
  object: string;
  description: string;
}

export interface iTicketSummaryDTO {
  totalTickets: number;
  inEsecuzione: number;
  completati: number;
  cancellati: number;
}
