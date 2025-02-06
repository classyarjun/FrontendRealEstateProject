
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../modal/admin';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  // private apiUrl = 'http://localhost:8080/api/admin'; // API ka apiUrl URL
    private apiUrl = environment.apiUrl; //?  apiUrl: 'http://localhost:8080/api',

  constructor(private http: HttpClient) {}

  /** Admin Registration */
  registerAdmin(adminData: Admin, profilePicture?: File): Observable<string> {
    const formData = new FormData();
    formData.append('adminData', JSON.stringify(adminData));
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    return this.http.post<string>(`${this.apiUrl}/admin/registerAdmin`, formData);
  }

  /** Admin Login */
  loginAdmin(username: string, password: string): Observable<string> {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    return this.http.post<string>(`${this.apiUrl}/admin/loginAdmin`, params.toString(), {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    });
  }

  /** Admin Logout */
  logoutAdmin(username: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/admin/logoutAdmin`, { username });
  }

  /** Get Admin by ID */
  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/admin/getAdminById/${adminId}`);
  }

  /** Get Admin by Username */
  getAdminByUsername(username: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/admin/getAdminByUsername/${username}`);
  }

  /** Get All Admins */
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/admin/getAllAdmins`);
  }

  /** Delete Admin */
  deleteAdmin(adminId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/admin/deleteAdmin/${adminId}`);
  }

  /** Update Admin */
  updateAdmin(adminId: number, adminData: Admin, profilePicture?: File): Observable<string> {
    const formData = new FormData();
    formData.append('adminData', JSON.stringify(adminData));
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    return this.http.put<string>(`${this.apiUrl}/admin/updateAdmin/${adminId}`, formData);
  }

  /** Approve Property */
  approveProperty(tempPropertyId: number, adminId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/admin/approve/${tempPropertyId}/${adminId}`, {},);
  }

  /** Reject Property */
  rejectProperty(tempPropertyId: number, adminId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/admin/reject/${tempPropertyId}/${adminId}`, {});
  }

  /** Get All Pending Properties */
  getAllPendingProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/pending`);
  }

}




