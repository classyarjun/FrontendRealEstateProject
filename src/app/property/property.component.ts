

import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from '../../modal/property';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit {

  pendingProperties: any[] = [];
  property: Property[] = [];
  allProperties: Property[] = [];
  selectedProperty: Property | null = null;
  selectedFiles: File[] = [];
  propertyForm: FormGroup;
  updateForm: FormGroup;
  isVisible = true;

  agentId: number = 9;

  constructor(private fb: FormBuilder, private propertyService: PropertyService) {
    // Property form initialization
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      size: [0, Validators.required],
      address: ['', Validators.required],
      yearBuilt: [null, Validators.required],
      propertyType: ['', Validators.required],
      bedrooms: [0, Validators.required],
      bathrooms: [0, Validators.required],
      amenities: [''],
      features: [''],
      status: ['', Validators.required],
      availability: ['', Validators.required],
      proximity: ['']
    });

    // Update form initialization
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      size: [0, Validators.required],
      address: ['', Validators.required],
      yearBuilt: [null, Validators.required],
      propertyType: ['', Validators.required],
      bedrooms: [0, Validators.required],
      bathrooms: [0, Validators.required],
      amenities: [''],
      features: [''],
      status: ['', Validators.required],
      proximity: ['']
    });
  }

  ngOnInit() {
    this.loadProperties();  // Fetch properties on initialization
  }

  toggle() {
    this.isVisible = !this.isVisible;  // Toggle visibility
  }

  // Handle file selection for images
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  // Load selected property details for updating
  loadProperty(propertyId: number): void {
    this.propertyService.getPropertyById(propertyId).subscribe(
      (property) => {
        this.selectedProperty = property;
        // console.log('Selected Property:', this.selectedProperty?.propertyId);  // Debugging line
        this.updateForm.patchValue(property);  // Populate the update form
      },
      (error) => console.error('Error fetching property:', error)
    );
  }

  // Load all properties
  loadProperties(): void {
    this.propertyService.getAllProperties().subscribe(
      (data: Property[]) => {
        this.allProperties = data || [];
        console.log('AllProperties:', data);
      },
      (error) => console.error("Error fetching properties:", error)
    );
  }

  // Delete a property by ID
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

  // Add a new property
  onSubmit() {
    if (this.propertyForm.valid) {
      const formData = new FormData();
      const formValue = { ...this.propertyForm.value };

      // Convert amenities from string to array
      formValue.amenities = formValue.amenities
        ? formValue.amenities.split(',').map((item: string) => item.trim())
        : [];

      formData.append('property', JSON.stringify(formValue));

      // Append selected images
      this.selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      // Add property via service
      this.propertyService.addProperty(this.agentId, formData).subscribe(
        (response) => {
          console.log('Property added:', response);
          alert('Property added successfully');
          this.propertyForm.reset();  // Reset the form
          this.selectedFiles = [];  // Reset selected files
          this.loadProperties();
        },
        (error) => console.error('Error:', error)
      );
    }
  }


  viewProperty(propertyId: number): void {
    this.propertyService.getPropertyById(propertyId).subscribe(
      (property) => {
        this.selectedProperty = property;
      },
      (error) => console.error('Error fetching property:', error)
    );
  }

  // Update an existing property
  updateProperty() {
    if (this.updateForm.valid && this.selectedProperty && this.selectedProperty.propertyId) {
      const formData = new FormData();
      const formValue = { ...this.updateForm.value };
      // Convert amenities from string to array if it's a string
      if (typeof formValue.amenities === 'string') {
        formValue.amenities = formValue.amenities
          .split(',')
          .map((item: string) => item.trim());
      }

      formData.append('property', new Blob([JSON.stringify(formValue)], { type: 'application/json' }));

      // Append images if selected
      this.selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      this.propertyService.updateProperty(this.selectedProperty.propertyId, formData).subscribe(
        (response) => {
          console.log('Property updated:', response);
          alert('Property updated successfully');
          this.loadProperties(); // Refresh properties list
        },
        (error) => console.error('Error updating property:', error)
      );
    }
  }

}
