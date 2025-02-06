import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.css']
})
export class AgentdashboardComponent {
  propertyForm: FormGroup;
  selectedFiles: FileList | null = null;

  agentId: number = 1; // Example agentId
  recipientEmail: string = "akkiraj7531@gmail.com";
  isVisible = true;


  constructor(private fb: FormBuilder, private propertyService: PropertyService) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      price: [0, Validators.required],
      size: [0, Validators.required],
      yearBuilt: [null, Validators.required],
      propertyType: ['', Validators.required],
      bedrooms: [0, Validators.required],
      bathrooms: [0, Validators.required],
      features: [''],
      amenities: [''], // New field
      proximity: [''], // New field
      galleryImages: [''], // New field
      status: ['', Validators.required],
    });
  }



  toggle() {
    this.isVisible = !this.isVisible;
  }


  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  // Submit Form
  onSubmit() {
    if (this.propertyForm.valid) {
      const formData = new FormData();
      // Convert amenities and galleryImages to arrays
      const amenitiesArray = this.propertyForm.value.amenities ? this.propertyForm.value.amenities.split(',') : [];
      const galleryImagesArray = this.propertyForm.value.galleryImages ? this.propertyForm.value.galleryImages.split(',') : [];

      const propertyData = {
        ...this.propertyForm.value,
        amenities: amenitiesArray,
        galleryImages: galleryImagesArray,
        admin: { adminId: 1 }
      };

      formData.append('property', JSON.stringify(propertyData));

      if (this.selectedFiles) {
        Array.from(this.selectedFiles).forEach((file) => {
          formData.append('profilePictures', file);
        });
      }

      formData.append('recipientEmail', this.recipientEmail);

      this.propertyService.saveProperty(propertyData, this.selectedFiles || undefined, this.agentId, this.recipientEmail)
        .subscribe(
          (response) => {
            console.log('Property saved:', response);
            alert('Property saved successfully');
            this.propertyForm.reset();
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }
}

