import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iTicket, iTicketDTO, iTicketSummaryDTO } from '../interfaces/i-ticket';
import { iPageAble } from '../interfaces/i-page-able';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  ticketUrl: string = environment.ticketUrl;
  findTicketUrl: string = environment.findTicketUrl;
  editTicketUrl: string = environment.editTicketUrl;
  statsTicketUrl: string = environment.statsTicketUrl;
  ticketFilterUrl: string = environment.ticketFilterUrl;

  constructor(private http: HttpClient) {}

  getStats(): Observable<iTicketSummaryDTO> {
    return this.http.get<iTicketSummaryDTO>(this.statsTicketUrl);
  }

  getTicket(
    page: number,
    size: number,
    status: string,
    date?: string,
    startDate?: string,
    endDate?: string
  ): Observable<iPageAble> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (status) {
      params = params.set('status', status);
    }
    if (date) {
      params = params.set('date', date);
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get<iPageAble>(this.ticketFilterUrl, { params });
  }

  findTicket(username: string): Observable<iTicket> {
    let params = new HttpParams().set('username', username);
    return this.http.get<iTicket>(this.findTicketUrl, { params });
  }

  editTicket(id: number, status: string): Observable<iTicket> {
    let params = new HttpParams().set('statusTicket', status);
    console.log(params);

    return this.http.put<iTicket>(
      `${this.editTicketUrl}/${id}`,
      {},
      { params }
    );
  }

  createTicket(TicketDTO: iTicketDTO): Observable<iTicket> {
    return this.http.post<iTicket>(this.ticketUrl, TicketDTO);
  }

  deleteTicket(id: number): Observable<iTicket> {
    return this.http.delete<iTicket>(`${this.ticketUrl}/${id}`);
  }
}
