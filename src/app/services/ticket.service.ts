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

  constructor(private http: HttpClient) {}

  getStats(): Observable<iTicketSummaryDTO> {
    return this.http.get<iTicketSummaryDTO>(this.statsTicketUrl);
  }

  getPromotionRequests(page: number, size: number): Observable<iPageAble> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<iPageAble>(this.ticketUrl, { params });
  }

  findPromotionRequest(username: string): Observable<iTicket> {
    let params = new HttpParams().set('username', username);
    return this.http.get<iTicket>(this.findTicketUrl, { params });
  }

  editPromotionRequest(id: number, status: string): Observable<iTicket> {
    return this.http.put<iTicket>(`${this.editTicketUrl}/${id}`, { status });
  }

  createRequest(requestDTO: iTicketDTO): Observable<iTicket> {
    return this.http.post<iTicket>(this.ticketUrl, { requestDTO });
  }

  deleteRequest(id: number): Observable<iTicket> {
    return this.http.delete<iTicket>(`${this.ticketUrl}/${id}`);
  }
}
