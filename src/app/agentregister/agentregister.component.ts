

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../../services/agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agentregister',
  templateUrl: './agentregister.component.html',
  styleUrls: ['./agentregister.component.css']
})


export class AgentregisterComponent implements OnInit {
  agentForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private agentService: AgentService, private router: Router) {}

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      experience: [0, Validators.required],
      rating: [0, Validators.required],
      bio: [''],
      status: ['ACTIVE'],
      approved: [false],
      profilePicture: [null],
    });
  }

  // Handle File Input Change
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Submit Form
  submitForm() {
    if (this.agentForm.invalid) {
      return;
    }

    const formData = new FormData();

    // Agent JSON ko stringify karke `agent` key me bhejna hoga
    formData.append('agent', JSON.stringify(this.agentForm.value));

    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    this.agentService.registerAgent(formData).subscribe({
      next: (response) => {
        alert('Agent registered successfully!');
        this.agentForm.reset();
          this.router.navigate(["/agentlogin"])
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Registration failed.');
      },
    });
  }
}
