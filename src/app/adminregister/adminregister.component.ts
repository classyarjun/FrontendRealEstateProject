// import { Component } from '@angular/core';
// import { AdminService } from './../../services/admin.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Admin } from '../../modal/admin';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-adminregister',
//   templateUrl: './adminregister.component.html',
//   styleUrls: ['./adminregister.component.css']
// })
// export class AdminregisterComponent {
//   admin: any = { // Initialize the admin object
//     username: '',
//     fullname: '',
//     email: '',
//     password: '',
//     mobileNo: '',
//     role: 'ADMIN', // Default value
//     status: 'ACTIVE' // Default value
//   };

//   profilePicture: File | null = null;
//   errorMessage: string = '';

//   constructor(private httpClient: HttpClient, private router: Router) {} // Inject Router

//   // Method to handle registration
//   registerAdmin() {
//     const formData = new FormData();
//     formData.append('adminData', JSON.stringify(this.admin));

//     if (this.profilePicture) {
//       formData.append('profilePicture', this.profilePicture);
//     }

//     this.httpClient.post('http://localhost:8080/api/admin/registerAdmin', formData, { responseType: 'text' })
//       .subscribe(
//         response => {
//           // Handle the success response
//           console.log('Registration successful:', response);
//           alert(response); // Optionally show a success message
//           this.router.navigate(['/adminlogin']); // Redirect to admin login page after successful registration
//         },
//         error => {
//           console.error('Error during registration:', error);
//           this.errorMessage = 'An error occurred during registration: ' + error.message;
//         }
//       );
//   }

//   // Method to handle profile picture change
//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.profilePicture = file;
//     }
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Placeholder method for dynamic text
  getPlaceholderText(field: string, defaultText: string): string {
    return !this.admin[field] ? `${defaultText} *` : defaultText;
  }
  showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}


  // Method to handle registration
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


    // Validate phone number format (10-digit number)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(this.admin.mobileNo)) {
      this.errorMessage = 'Please enter a valid 10-digit mobile number.';
      return;
    }

    const formData = new FormData();
    formData.append('adminData', JSON.stringify(this.admin));

    if (this.profilePicture) {
      formData.append('profilePicture', this.profilePicture);
    }

    this.httpClient.post('http://localhost:8080/api/admin/registerAdmin', formData, { responseType: 'text' })
      .subscribe(
        response => {
          console.log('Registration successful:', response);
          this.successMessage = 'Registration successful! You can now log in.';
          alert("Registration is successful")
          this.router.navigate(['/adminlogin']); // Redirect to admin login
        },
        error => {
          console.error('Error during registration:', error);
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      );
  }

  // Method to handle profile picture change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profilePicture = file;
    }
  }

  // Close registration modal (Navigate to Home)
  closeLogin(): void {
    this.router.navigate(['/']);
  }

}

