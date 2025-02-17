import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  loginAdmin(): void {
    const params = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);

    this.http
      .post('http://localhost:8080/api/admin/loginAdmin', params)
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          alert('Login successful');
          this.router.navigate(['/adminpanel']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid credentials. Please try again.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        },
      });
  }
  showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

   // Close login modal (Navigate to Home)
   closeLogin(): void {
    this.router.navigate(['/']);
  }
}

