

//? ================//  second testing working ===============================

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
  showPassword: boolean = false;

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

    this.authService.adminLogin(username, password,'ADMIN').subscribe({
      next: (response) => {
        console.log("adminlognrespons",response);
        if (response.data && response.data.token) {
          this.authService.setToken(response.data.token,'admin_token');
          this.authService.setRoleId(response.data.adminId,'adminId');
          this.router.navigate(['/adminpanel']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid username or password!';
      }
    });



  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  closeForm(){
    this.router.navigate(["/"])
  }
}
