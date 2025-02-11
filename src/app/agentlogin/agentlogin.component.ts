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
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private agentService: AgentService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  closeLogin(): void {
    this.router.navigate(['/']);
  }

  loginAgent(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.agentService.loginAgent(username, password).subscribe(
        (data) => {
          alert('Login successful!');
          console.log('Logged in agent:', data);
          this.router.navigate(['/agentpanel']);
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        }
      );
    }
  }
}
