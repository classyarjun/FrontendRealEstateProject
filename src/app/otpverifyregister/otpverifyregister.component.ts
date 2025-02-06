import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otpverifyregister',
  templateUrl: './otpverifyregister.component.html',
  styleUrls: ['./otpverifyregister.component.css']
})
export class OtpverifyregisterComponent {


  otp: string = '';
  email: string = '';
  message: string = ''; // Used to display the success/error message

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve email from query params
    this.email = this.route.snapshot.queryParams['email'];
  }

  verifyOtp(): void {
    if (this.otp.trim() === '') {
      this.message = 'Please enter a valid OTP.';
      return;
    }

    // Call the service method to verify OTP
    this.userService.verifyOtp(this.email, this.otp).subscribe(
      (response) => {
        console.log("Verfy register msg",response);
        this.message = 'OTP Verified! You are now registered.';

          this.router.navigate(['/userlogin']);

      },
      (error) => {
        console.error('Error:', error);
        this.message = 'Error: ' + error.error;
      }
    );
  }
}


