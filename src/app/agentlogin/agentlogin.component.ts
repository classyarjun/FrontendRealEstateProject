

import { Component } from '@angular/core';
import { AgentService } from 'src/services/agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agentlogin',
  templateUrl: './agentlogin.component.html',
  styleUrls: ['./agentlogin.component.css']
})
export class AgentloginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false; // Password visibility state

  constructor(private agentService: AgentService, private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Close login modal (Navigate to Home)
  closeLogin(): void {
    this.router.navigate(['/']);
  }

  // Submit login
  loginAgent(): void {
    this.agentService.loginAgent(this.username, this.password).subscribe(
      (data) => {
        alert('Login successful!');
        console.log('Logged in agent:', data);
        this.router.navigate(['/agentpanel']); // Redirect after login
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}

