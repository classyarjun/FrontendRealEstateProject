import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  errorMessage: string = '';

  constructor(private agentService: AgentService, private router: Router) {}


  loginAgent(): void {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.agentService.loginAgent(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Agent login successful:', response);
        alert('Login successful');
        this.router.navigate(['/agentpanel']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      },
    });
  }
  navigateToRegister(): void {
    this.router.navigate(['/agentregister']);
  }
}



