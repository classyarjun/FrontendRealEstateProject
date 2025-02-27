

// //? testing success
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private apiUrl = 'http://localhost:8080/api/admin/loginAdmin'; // Backend Admin Login API

//   constructor(private http: HttpClient) {}

//   // Admin Login
//   adminLogin(username: string, password: string): Observable<any> {
//     return this.http.post<any>(this.apiUrl, { username, password });
//   }

//   userLogin(username: string, password: string): Observable<any> {
//     return this.http.post<any>(this.apiUrl, { username, password });
//   }

//   agentLogin(username: string, password: string): Observable<any> {
//     return this.http.post<any>(this.apiUrl, { username, password });
//   }

//   // Token Store Karna
//   setToken(token: string): void {
//     localStorage.setItem('admin-token', token);
//   }

//   // Token Retrieve Karna
//   getToken(): string | null {
//     return localStorage.getItem('admin-token');
//   }

//   // Token Hatana (Logout)
//   logout(): void {
//     localStorage.removeItem('admin-token');
//   }

//   // Admin Logged in hai ya nahi
//   isAuthenticated(): boolean {
//     return this.getToken() !== null;
//   }
// }




 //? testing in progredss
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api'; // ✅ Backend ke common login API ka use karo

  constructor(private http: HttpClient) {}

  // ✅ Common Login Function (role ke sath)
  adminLogin(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/loginAdmin`, { username, password, role });
  }

  userLogin(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/loginUser`, { username, password, role });
  }


  agentLogin(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agents/loginAgent`, { username, password, role });
  }


  // ✅ Store token (Role wise)
  setToken(token: string, role: string): void {
    localStorage.setItem(`${role}-token`, token); // ✅ Role-wise token store
  }

  // ✅ Token Retrieve Karna
  getToken(role: string): string | null {
    return localStorage.getItem(`${role}-token`);
  }

  // ✅ Logout (Role Wise)
  logout(role: string): void {
    localStorage.removeItem(`${role}-token`);
  }

  // ✅ JWT Token Decode Karke Role Nikalna
  getUserRole(): string | null {

    const token =
    this.getToken('admin_token')||
    this.getToken('user_token') ||
    this.getToken('agent_token');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // JWT Decode
        console.log("payload",payload);

        return payload.role; // ✅ Token ke andar "role" key honi chahiye
      } catch (error) {
        console.error('Invalid Token:', error);
        return null;
      }
    }
    return null;
  }

  // ✅ Check Authenticated User
  isAuthenticated(role: string): boolean {
    return this.getToken(role) !== null;
  }
}
