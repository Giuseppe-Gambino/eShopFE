import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iAccessData } from '../interfaces/i-access-data';
import { environment } from '../../environments/environment.development';
import { iUser } from '../interfaces/i-user';
import { iLoginRequest } from '../interfaces/i-login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;
  autoLogoutTimer: any;

  authSubject$ = new BehaviorSubject<iAccessData | null>(null);

  isLoggedIn$ = this.authSubject$
    .asObservable()
    .pipe(map((accessData) => !!accessData));

  user$ = this.authSubject$
    .asObservable()
    .pipe(map((accessData) => accessData?.user));

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  register(userData: Partial<iUser>) {
    return this.http.post<iUser>(this.registerUrl, userData);
  }

  login(authData: iLoginRequest) {
    return this.http.post<iAccessData>(this.loginUrl, authData).pipe(
      tap((accessData) => {
        if (accessData && accessData.token) {
          this.authSubject$.next(accessData);
          localStorage.setItem('accessData', JSON.stringify(accessData));

          const expDate = this.jwtHelper.getTokenExpirationDate(
            accessData.token
          ) as Date;
          if (expDate) {
            // this.autoLogout(expDate);
          } else {
            console.error('La data di scadenza del token non è valida');
            this.logout();
          }
        } else {
          console.error('Token non presente nella risposta:', accessData);
          this.logout();
        }
      }),
      catchError((error) => {
        console.error('Errore durante il login:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    this.authSubject$.next(null);
    localStorage.removeItem('accessData');
    this.tornaLogin();
  }

  tornaLogin() {
    this.router.navigate(['/auth/login']);
  }

  // autoLogout(expDate: Date) {
  //   clearTimeout(this.autoLogoutTimer);
  //   const expMs = expDate.getTime() - new Date().getTime();

  //   if (expMs > 0) {
  //     // Controlla se la scadenza è nel futuro
  //     this.autoLogoutTimer = setTimeout(() => {
  //       this.logout();
  //       this.router.navigate(['/auth/login']);
  //     }, expMs);
  //   } else {
  //     this.router.navigate(['/auth/login']);
  //     this.logout(); // Se il token è già scaduto, effettua il logout immediatamente
  //   }
  // }

  restoreUser() {
    const userJson: string | null = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData: iAccessData = JSON.parse(userJson);

    this.authSubject$.next(accessData);
  }
}
