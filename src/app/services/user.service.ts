import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { iUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = environment.userUrl;
  private avatarSubject = new BehaviorSubject<string | undefined>(undefined);
  avatar$ = this.avatarSubject.asObservable();

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<iUser> {
    return this.http.get<iUser>(`${this.userUrl}/${id}`);
  }

  getByUser(): Observable<iUser> {
    return this.http.get<iUser>(this.userUrl);
  }

  getAvatar(): void {
    this.http.get<iUser>(this.userUrl).subscribe((result) => {
      this.avatarSubject.next(result.avatar);
    });
  }
}
