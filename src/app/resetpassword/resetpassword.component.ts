import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotpassService } from './../../services/forgotpass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  passwordForm!: FormGroup;
  currentView: string = 'forgot'; // Initial view (forgot, reset, change)
  message: string = '';

  constructor(
    private ForgotpassService: ForgotpassService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef, // ✅ Inject ChangeDetectorRef
    private router : Router
  ) {
    this.initForgotPasswordForm();
  }

  initForgotPasswordForm() {
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  initResetPasswordForm() {
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  initChangePasswordForm() {
    this.passwordForm = this.fb.group({
      userId: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  submit() {
    if (this.passwordForm.valid) {
      if (this.currentView === 'forgot') {
        this.ForgotpassService.forgotPassword(this.passwordForm.value.email).subscribe({
          next: (response) => {
            console.log(response); // Debugging log
            this.message = typeof response === 'string' ? response : 'OTP sent successfully';
            this.switchView('reset'); // Move to reset password page
          },
          error: (err) => {
            console.log(err); // Debugging log
            this.message = this.extractMessage(err);
          },
        });
      } else if (this.currentView === 'reset') {
        const { email, otp, password, confirmPassword } = this.passwordForm.value;
        this.ForgotpassService.resetPassword(email, otp, password, confirmPassword).subscribe({
          next: (response) => {
            console.log(response); // Debugging log
            this.message = typeof response === 'string' ? response : 'Password reset successfully';
            alert("Password Reset Sucessfully");
            this.router.navigate(['/userlogin']);
          },
          error: (err) => {
            console.log(err); // Debugging log
            this.message = this.extractMessage(err);
          },
        });
      } else if (this.currentView === 'change') {
        const { userId, oldPassword, newPassword, confirmPassword } = this.passwordForm.value;
        this.ForgotpassService.changePassword(userId, oldPassword, newPassword, confirmPassword).subscribe({
          next: (response) => {
            console.log(response); // Debugging log
            this.message = typeof response === 'string' ? response : 'Password changed successfully';
            alert("Password Change Sucessfully@@@@@@");
            // Force change detection and navigate
            this.cdr.detectChanges(); // Force UI update

            // Optionally delay navigation to ensure view update
            setTimeout(() => {

            }, 0);
          },
          error: (err) => {
            console.log(err); // Debugging log
            this.message = this.extractMessage(err);
          },
        });
      }
    }
  }


  extractMessage(error: any): string {
    console.log('Error Response:', error);
    if (error?.error) {
      if (typeof error.error === 'string') {
        return error.error; // If the error is a plain text message
      } else if (typeof error.error === 'object' && 'text' in error.error) {
        return error.error.text; // Extract 'text' field if available
      }
    }

    return 'An unknown error occurred';
  }

   getErrorMessage(error: any): string {
    if (typeof error.error === 'string') {
      return error.error; // If backend sends a plain string error
    } else if (typeof error.error === 'object') {
      return JSON.stringify(error.error); // Convert object to string
    } else {
      return 'An unknown error occurred';
    }
  }

   switchView(view: string) {
    this.currentView = view;
    if (view === 'forgot') this.initForgotPasswordForm();
    if (view === 'reset') this.initResetPasswordForm();
    if (view === 'change') this.initChangePasswordForm();

    this.cdr.detectChanges(); // Force UI update
  }

}





