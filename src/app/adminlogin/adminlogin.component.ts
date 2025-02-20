


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-adminlogin',
//   templateUrl: './adminlogin.component.html',
//   styleUrls: ['./adminlogin.component.css'],
// })

// export class AdminLoginComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   login() {
//     this.authService.login(this.username, this.password).subscribe({
//       next: (response) => {
//         if (response.data && response.data.token) {
//           this.authService.setToken(response.data.token);
//           this.router.navigate(['/adminpanel']);
//         }
//       },
//       error: (error) => {
//         this.errorMessage = 'Invalid username or password!';
//       }
//     });
//   }
// }


//? ================//  second testing  ===============================

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.adminLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.adminLoginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials!';
      return;
    }

    const { username, password } = this.adminLoginForm.value;

    this.authService.adminLogin(username, password).subscribe({
      next: (response) => {
        if (response.data && response.data.token) {
          this.authService.setToken(response.data.token);
          this.router.navigate(['/adminpanel']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid username or password!';
      }
    });
  }
}
