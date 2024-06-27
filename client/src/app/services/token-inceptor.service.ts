// src/app/services/token-interceptor.service.ts

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    let authReq = req;

    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401 && error.error.message === 'jwt expired') {
          // Token expired, attempt to refresh
          return this.authService.refreshToken().pipe(
            switchMap((newTokens: any) => {
              // Store new tokens
              localStorage.setItem('accessToken', newTokens.accessToken);
              localStorage.setItem('refreshToken', newTokens.refreshToken);

              // Clone the original request and set the new access token
              const newAuthReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokens.accessToken}`
                }
              });

              // Retry the failed request
              return next.handle(newAuthReq);
            }),
            catchError(err => {
              // If refreshing the token fails, handle logout
              this.authService.logout();
              return throwError(err);
            })
          );
        }

        return throwError(error);
      })
    );
  }
}
