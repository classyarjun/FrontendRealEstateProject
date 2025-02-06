import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from '../../services/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

   contactForm: FormGroup;
  isModalOpen = true; // Modal is open by default

  constructor(private fb: FormBuilder, private contactUsService: ContactusService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''], // Optional field
      message: ['', Validators.required],
    });
  }

  closeModal(): void {
    this.isModalOpen = false; // Hide the modal
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactUsService.saveContact(this.contactForm.value).subscribe({
        next: (response) => {
          alert('Thank you for contacting us!');
          this.contactForm.reset(); // Reset the form
          this.closeModal(); // Close the modal after submission
        },
        error: (error) => {
          console.error('Error:', error);
          alert('There was an error submitting the form. Please try again later.');
        },
      });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
