// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../services/user.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-userlogin',
//   templateUrl: './userlogin.component.html',
//   styleUrls: ['./userlogin.component.css']
// })
// export class UserloginComponent {

//   loginForm: FormGroup;
//   showPassword = false; // Track password visibility state

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }



//   togglePasswordVisibility(): void {
//     this.showPassword = !this.showPassword; // Toggle visibility state
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       console.log('Login successful:', this.loginForm.value);
//       alert('User successfully logged in!');
//       this.router.navigate(['/']);
//       // Add your login logic here, such as calling a service for authentication.
//     } else {
//       alert('Please fill out all required fields correctly.');
//     }
//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  userLoginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.userLoginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials!';
      return;
    }

    const { username, password } = this.userLoginForm.value;

    this.AuthService.userLogin(username, password,'USER').subscribe({
      next: (response: any) => {
        // console.log("Userlognrespons",response);
        if (response.data && response.data.token) {
          this.AuthService.setToken(response.data.token,'user_token');
          this.router.navigate(['/home']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid username or password!';
      }
    });

  }
}
