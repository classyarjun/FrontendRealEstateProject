// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Admin } from '../Modals/admin';


// @Injectable({
//   providedIn: 'root'
// })
// export class AdminService {

//   private apiUrl = 'http://localhost:8080/api/admin';

//   constructor(private http: HttpClient) {}

//   // Register admin method
//   registerAdmin(admin: Admin, profilePicture: File | null): Observable<any> {
//     const formData: FormData = new FormData();
//     formData.append('adminData', JSON.stringify(admin));
//     if (profilePicture) {
//       formData.append('profilePicture', profilePicture, profilePicture.name);
//     }
//     return this.http.post(`${this.apiUrl}/registerAdmin`, formData);
//   }

//   // Login admin method
//   loginAdmin(username: string, password: string): Observable<any> {
//     const formData: FormData = new FormData();
//     formData.append('username', username);
//     formData.append('password', password);
//     return this.http.post(`${this.apiUrl}/loginAdmin`, formData);
//   }
// }
