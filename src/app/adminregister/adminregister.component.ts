

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css']
})
export class AdminregisterComponent {
  admin: any = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    mobileNo: '',
    role: 'ADMIN',
    status: 'ACTIVE'
  };

  profilePicture: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;

  constructor(private adminService: AdminService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Placeholder method for dynamic text
  getPlaceholderText(field: string, defaultText: string): string {
    return !this.admin[field] ? `${defaultText} *` : defaultText;
  }

  registerAdmin() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validate required fields
    if (!this.admin.username || !this.admin.fullname || !this.admin.email ||
        !this.admin.password || !this.admin.mobileNo) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.admin.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    const usernamePattern = /^[a-z]+$/;
    if (!usernamePattern.test(this.admin.username)) {
      this.errorMessage = 'Username must contain only lowercase letters.';
      return;
    }

    // Validate phone number format (10-digit number)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(this.admin.mobileNo)) {
      this.errorMessage = 'Please enter a valid 10-digit mobile number.';
      return;
    }

    // Pass undefined instead of null
    this.adminService.registerAdmin(this.admin, this.profilePicture ?? undefined)
      .subscribe(
        response => {
          console.log('Registration successful:', response);
          this.successMessage = 'Registration successful! You can now log in.';
          alert("Registration is successful");
          this.router.navigate(['/adminlogin']);
        },
        error => {
          console.error('Error during registration:', error);
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      );
  }


  ///? Handle profile picture upload
  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.profilePicture = file;
  //   }
  // }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'Only PNG, JPG, and JPEG files are allowed for the profile picture.';
        this.profilePicture = null;
      } else {
        this.errorMessage = ''; // Clear previous error if any
        this.profilePicture = file;
      }
    }
  }


  // Close registration modal (Navigate to Home)
  closeLogin(): void {
    this.router.navigate(['/']);
  }
}

