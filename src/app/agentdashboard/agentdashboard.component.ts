import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { Property } from 'src/modal/property';

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.css']
})
export class AgentdashboardComponent implements OnInit  {
  propertyForm: FormGroup;
  selectedFiles: FileList | null = null;

  agentId: number = 1; // Example agentId
  recipientEmail: string = "akkiraj7531@gmail.com";
  isVisible = true;
  property: Property[] = [];
  properties: Property[] = [];

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
  ngOnInit() {
    this.loadProperties();
  }
  toggle() {
    this.isVisible = !this.isVisible;
  }

  loadProperties(): void {
    this.propertyService.getAllProperties().subscribe(
      (data: Property[]) => {
        this.properties = data;
      },
      (error) => console.error("Error fetching properties:", error)
    );
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


  deleteProperty(propertyId: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(propertyId).subscribe({
        next: (response) => {
          console.log('Property deleted successfully', response);
          this.loadProperties();  // Refresh the properties list
        },
        error: (error) => {
          console.error('Error deleting property', error);
        },
      });
    }
  }

}

