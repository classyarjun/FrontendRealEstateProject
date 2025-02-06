import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  fileSizeError: boolean = false;
  fileFormatError: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
    }, { validators: this.passwordMatcher });
  }

  // Validator to check if password and confirmPassword match
  passwordMatcher(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Handle file selection with validation
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
      if (file.size > 2 * 1024 * 1024) {
        this.fileSizeError = true;
        alert('File size should be less than 2MB.');
        this.selectedFile = null;
        return;
      } else {
        this.fileSizeError = false;
      }

      if (!allowedFormats.includes(file.type)) {
        this.fileFormatError = true;
        alert('Invalid file format! Only JPG, JPEG, and PNG are allowed.');
        this.selectedFile = null;
        return;
      } else {
        this.fileFormatError = false;
      }

      this.selectedFile = file;
    }
  }

  // Register Temporary User
  registerUser(): void {
    if (this.registerForm.invalid || !this.selectedFile) {
      alert('Please fill all fields correctly and select a profile picture.');
      return;
    }
    if (this.registerForm.hasError('passwordMismatch')) {
      alert('Passwords do not match.');
      return;
    }

    // Convert form data to JSON
    const userData = this.registerForm.value;

    // Prepare form data with JSON stringified data and file
    const formData = new FormData();
    formData.append('userData', JSON.stringify(userData));  // Append the user data as a JSON string
    formData.append('profilePicture', this.selectedFile); // Append the selected file

    // Call the userService to send data to the backend
    this.userService.registerTemporaryUser(formData).subscribe(
      (response) => {
        console.log("Response:", response);

        if (response.message === 'Temporary user registered. Please verify OTP sent to your email.') {
          alert('User registered successfully! OTP has been sent to your email.');

          // Redirect to OTP verification page, passing email as a query parameter
          this.router.navigate(['/otpverifyregister'], { queryParams: { email: userData.email } });
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
    );
  }
}

