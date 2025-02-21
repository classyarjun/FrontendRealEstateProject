

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =
    this.authService.getToken("admin_token")||
    this.authService.getToken("user_token") ||
    this.authService.getToken("agent_token"); // ✅ Token get karna

    let authReq = req; // ✅ Default request

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // ✅ Token add in headers
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout(''); // ❌ Logout if unauthorized
          this.router.navigate(['']); // 🔄 Redirect to login
        }
        return throwError(error);
      })
    );
  }
}
