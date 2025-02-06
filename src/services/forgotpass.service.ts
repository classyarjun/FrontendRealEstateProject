import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {

  private apiUrl = environment.apiUrl; //?  apiUrl: 'http://localhost:8080/api',

  //private apiUrl = 'http://localhost:8080/api/forgotPassword';

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/forgotPassword/user/${email}`, {}, { responseType: 'text' });
  }


  resetPassword(email: string, otp: string, password: string, confirmPassword: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/forgotPassword/user/resetPassword/${email}`,
      { otp, password, confirmPassword },
      { responseType: 'text' as 'json' }
    );
  }


  changePassword(userId: number, oldPassword: string, newPassword: string, confirmPassword: string): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/forgotPassword/changePassword/${userId}`, null, {
      params: { oldPassword, newPassword, confirmPassword }
    });
  }
}




