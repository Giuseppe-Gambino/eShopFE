import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = environment.userUrl;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<iUser> {
    return this.http.get<iUser>(`${this.userUrl}/${id}`);
  }
}
