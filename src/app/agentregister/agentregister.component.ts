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
  fileError: string = '';
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private agentService: AgentService, private router: Router) {}

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        ]
      ],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      experience: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      bio: ['', [Validators.maxLength(500)]],
      status: ['ACTIVE'],
      approved: [false],
      profilePicture: [null],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        this.fileError = 'Only image files are allowed!';
        this.selectedFile = null;
      } else if (file.size > 2 * 1024 * 1024) {
        this.fileError = 'File size should not exceed 2MB!';
        this.selectedFile = null;
      } else {
        this.fileError = '';
        this.selectedFile = file;
      }
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  closeForm() {
    this.router.navigate(['/']); // फॉर्म को क्लोज कर Home पेज पर रीडायरेक्ट करें
  }

  submitForm() {
    if (this.agentForm.invalid || this.fileError) {
      return;
    }

    const formData = new FormData();
    formData.append('agent', JSON.stringify(this.agentForm.value));

    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    this.agentService.registerAgent(formData).subscribe({
      next: (response) => {
        alert('Agent registered successfully!');
        this.agentForm.reset();
        this.router.navigate(["/agentlogin"]);
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Registration failed.');
      },
    });
  }
}
