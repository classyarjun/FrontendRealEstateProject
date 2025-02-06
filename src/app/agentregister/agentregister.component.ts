// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AgentService } from '../../services/agent.service';
// import { Agent } from '../../modal/agent';


// @Component({
//   selector: 'app-agentregister',
//   templateUrl: './agentregister.component.html',
//   styleUrls: ['./agentregister.component.css']
// })
// export class AgentregisterComponent {

//   agent: Agent = new Agent();
//   profilePicture?: File;
//   agreementChecked: boolean = false; // Track the checkbox state

//   constructor(private agentService: AgentService, private router: Router) {} // Inject Router

//   // File selection handler
//   onFileSelected(event: any): void {
//     this.profilePicture = event.target.files[0];
//   }

//   // Submit registration
//   registerAgent(): void {
//     if (this.agreementChecked) {
//       this.agentService.registerAgent(this.agent, this.profilePicture).subscribe(
//         (data) => {
//           alert('Agent registered successfully!');
//           console.log(data);
//           this.agent = new Agent(); // Reset the form.

//           // Redirect to the login page after successful registration
//           this.router.navigate(['/agentlogin']);
//         },
//         (error) => {
//           console.error('Error registering agent:', error);
//           alert('Failed to register agent. Please try again.');
//         }
//       );
//     } else {
//       alert('Please agree to the terms and conditions before registering.');
//     }
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AgentService } from '../services/agent.service';
// import { Agent } from '../Modals/agent';
import { AgentService } from 'src/services/agent.service';
import { Agent } from '../../modal/agent';

@Component({
  selector: 'app-agentregister',
  templateUrl: './agentregister.component.html',
  styleUrls: ['./agentregister.component.css']
})
export class AgentregisterComponent {

  agent: Agent = new Agent();
  profilePicture?: File;
  agreementChecked: boolean = false;
  showPassword: boolean = false;
  isFormSubmitted: boolean = false;  // To track the success popup
  errorMessage: string = ''; // To track error message

  constructor(private agentService: AgentService, private router: Router) {}

  // File selection handler
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.profilePicture = file;
    } else {
      alert('Please upload a valid image file.');
    }
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Clear Form (Cross Button)
  clearForm(): void {
    this.agent = new Agent();
    this.profilePicture = undefined;
    this.agreementChecked = false;
    this.isFormSubmitted = false;  // Reset success popup flag
  }

  // Submit registration
  registerAgent(): void {
    if (this.agreementChecked) {
      this.agentService.registerAgent(this.agent, this.profilePicture).subscribe(
        (data) => {
          this.isFormSubmitted = true; // Show success popup
          setTimeout(() => {
            this.clearForm(); // Clear form after 3 seconds
            this.router.navigate(['/agentlogin']);
          }, 3000);
        },
        (error) => {
          this.errorMessage = 'Failed to register agent. Please try again.'; // Set error message
          console.error('Error registering agent:', error);
        }
      );
    } else {
      this.errorMessage = 'Please agree to the terms and conditions before registering.'; // Error for missing agreement
    }
  }

  // Close login modal (Navigate to Home)
  closeLogin(): void {
    this.router.navigate(['/']);
  }

  // Close the success popup manually
  closePopup(): void {
    this.isFormSubmitted = false;
  }
}

