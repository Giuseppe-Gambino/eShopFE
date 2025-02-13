import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Escludiamo la richiesta di login per non appiccicare il token
    if (request.url.includes(environment.loginUrl)) {
      return next.handle(request);
    }

    const accessData = this.authSvc.authSubject$.getValue();
    if (!accessData) {
      return next.handle(request);
    }

    const newRequest = request.clone({
      headers: request.headers.append(
        'Authorization',
        `Bearer ${accessData.token}`
      ),
    });

    return next.handle(newRequest).pipe(
      catchError((error) => {
        // Se riceviamo un 401 dal backend, eseguiamo il logout
        if (error.status === 401) {
          this.authSvc.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
