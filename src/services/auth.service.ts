

//! first testing

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {

//   private apiUrl = 'http://localhost:8080/api'; // Backend API URL

//   constructor(private http: HttpClient, private router: Router) {}

//   //// ? Login function
//   adminLogin(credentials: { username: string; password: string }) {
//     return this.http.post(`${this.apiUrl}/admin/loginAdmin`, credentials, { withCredentials: true });
//   }

//   // Logout function
//   logout() {
//     this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
//       this.router.navigate(['/login']);
//     });
//   }

//   // Check if admin is logged in
//   isLoggedIn(): boolean {
//     return document.cookie.includes('jwt_token');
//   }
// }

//? third testing
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/admin/loginAdmin'; // Backend Admin Login API

  constructor(private http: HttpClient) {}

  // Admin Login
  adminLogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  userLogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  agentLogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  // Token Store Karna
  setToken(token: string): void {
    localStorage.setItem('admin-token', token);
  }

  // Token Retrieve Karna
  getToken(): string | null {
    return localStorage.getItem('admin-token');
  }

  // Token Hatana (Logout)
  logout(): void {
    localStorage.removeItem('admin-token');
  }

  // Admin Logged in hai ya nahi
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
