

import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin.service';
import { PropertyService } from 'src/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from '../../modal/property';
import { AgentService } from 'src/services/agent.service';



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
  agentId: number = 9;

  isVisible = true;



  constructor(private fb: FormBuilder, private propertyService: PropertyService) {
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
  }

  ngOnInit() {
    this.loadProperties();
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }
  // Handle file selection
  // Add a new property
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }
  // Load all properties
  loadProperties(): void {
    this.propertyService.getAllProperties().subscribe(
      (data: Property[]) => {
        this.allProperties = data;
        console.log('AllProperties:', data);
      },
      (error) => console.error("Error fetching properties:", error)
    );
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

  // Load a property for updating
  loadProperty(propertyId: number): void {
    this.propertyService.getPropertyById(propertyId).subscribe(
      (property) => {
        this.selectedProperty = property;
        // console.log('Fetched Property:', property);
      },
      (error) => console.error('Error fetching property:', error)
    );
  }



  onSubmit() {
    if (this.propertyForm.valid) {
      const formData = new FormData();
      const formValue = { ...this.propertyForm.value };

      // Convert amenities from string to array
      formValue.amenities = formValue.amenities ? formValue.amenities.split(',').map((item: string) => item.trim()) : [];

      formData.append('property', JSON.stringify(formValue));

      this.selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      this.propertyService.addProperty(this.agentId, formData).subscribe(
        (response) => {
          console.log('Property added:', response);
          alert('Property added successfully');
          this.propertyForm.reset();
          this.selectedFiles = [];
        },
        (error) => console.error('Error:', error)
      );
    }
  }

  // Update an existing property
  // updateProperty(): void {
  //   if (this.selectedProperty) {
  //     const formData = new FormData();

  //     // Convert form value to JSON
  //     const propertyJson = JSON.stringify(this.updateForm.value);
  //     formData.append("property", propertyJson);

  //     // Add multiple files
  //     if (this.selectedFiles) {
  //       Array.from(this.selectedFiles).forEach((file) => {
  //         formData.append("files", file);
  //       });
  //     }

  //     if (confirm("Are you sure you want to update this property?")) {
  //       this.propertyService.updateProperty(this.selectedProperty.propertyId!, formData).subscribe(
  //         (response) => {
  //           // console.log("Property updated successfully:", response);
  //           alert("Property updated successfully");
  //           this.selectedProperty = null;
  //           this.updateForm.reset();
  //           this.selectedFiles = null;
  //           this.loadProperties(); // Refresh property list
  //         },
  //         (error) => console.error("Error updating property:", error)
  //       );
  //     }
  //   }
  // }


}





// //? =========================================================================



// export class XyzComponent implements OnInit {
//   // propertyForm: FormGroup;
//   // selectedFiles: File[] = [];
//   // agentId: number = 9;

//   constructor(private fb: FormBuilder, private propertyService: PropertyService) {
//     this.propertyForm = this.fb.group({
//       title: ['', Validators.required],
//       price: [0, Validators.required],
//       size: [0, Validators.required],
//       address: ['', Validators.required],
//       yearBuilt: [null, Validators.required],
//       propertyType: ['', Validators.required],
//       bedrooms: [0, Validators.required],
//       bathrooms: [0, Validators.required],
//       amenities: [''],
//       features: [''],
//       status: ['', Validators.required],
//       availability: ['', Validators.required],
//       proximity: ['']
//     });
//   }

//   ngOnInit() {}

//  }


