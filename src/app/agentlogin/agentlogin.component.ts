
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agentlogin',
  templateUrl: './agentlogin.component.html',
  styleUrls: ['./agentlogin.component.css']
})
export class AgentloginComponent implements OnInit {
  agentLoginForm!: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = true;

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) {}

  ngOnInit() {
    this.agentLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.agentLoginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials!';
      return;
    }

    const { username, password } = this.agentLoginForm.value;

    this.AuthService.agentLogin(username, password,'AGENT').subscribe({
      next: (response) => {
        // console.log(response);
        if (response.data && response.data.token) {
          this.AuthService.setToken(response.data.token,'agent_token');
          this.AuthService.setRoleId(response.data.agentId,'agentId');
          alert('Agent Login successfully!');
          this.router.navigate(['/agentpanel']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid username or password!';
      }
    });
  }



  closeForm(){
    this.router.navigate(["/"])
  }



  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
