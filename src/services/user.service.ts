import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modal/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  //   // private apiUrl = 'http://localhost:8080/api/users';

  private apiUrl = environment.apiUrl; //?  apiUrl: 'http://localhost:8080/api',

  constructor(private http: HttpClient) {}

  // private apiUrl = 'http://localhost:8080/api/users'; // Update with your backend URL

  registerTemporaryUser(
    formData: FormData
  ): Observable<{ status: string; message: string }> {
    return this.http.post<{ status: string; message: string }>(
      `${this.apiUrl}/users/registerTemporaryUser`,
      formData
    );
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post(
      `${this.apiUrl}/users/verifyOtpToRegisterUser?email=${email}&otp=${otp}`,
      {},
      { responseType: 'text' } // <--- Specify responseType as text
    );
  }

  // loginUser(username: string, password: string): Observable<any> {
  //   const loginDetails = { username, password };

  //   // Set the Content-Type header to 'application/json'
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   return this.http.post(`${this.apiUrl}/loginUser`, loginDetails, {
  //     headers,
  //   });
  // }

  //Get All Users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/getAllUsers`);
  }

  //Get User By Id
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/getUserById/${id}`);
  }

  //Update User
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/updateUser`, user);
  }

  //Delete User
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/deleteUser/${id}`);
  }
}
