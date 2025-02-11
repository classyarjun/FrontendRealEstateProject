// import { Component, OnInit } from '@angular/core';
// import { AdminService } from 'src/services/admin.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PropertyService } from 'src/services/property.service';
// import { Property } from '../../modal/property';


// @Component({
//   selector: 'app-property',
//   templateUrl: './property.component.html',
//   styleUrls: ['./property.component.css'],
// })
// export class PropertyComponent implements OnInit {
//   pendingProperties: any[] = [];
//   property: Property[] = [];
//   properties: any[] = [];

//   propertyForm: FormGroup;
//   selectedFiles: FileList | null = null;
//   agentId: number = 1; // Example agentId
//   recipientEmail: string = "akkiraj7531@gmail.com";
//   isVisible = true;


//   constructor(private fb: FormBuilder,  private AdminService: AdminService,private PropertyService: PropertyService) {
//     this.propertyForm = this.fb.group({
//       title: ['', Validators.required],
//       address: ['', Validators.required],
//       price: [0, Validators.required],
//       size: [0, Validators.required],
//       yearBuilt: [null, Validators.required],
//       propertyType: ['', Validators.required],
//       bedrooms: [0, Validators.required],
//       bathrooms: [0, Validators.required],
//       features: [''],
//       amenities: [''], // New field
//       proximity: [''], // New field
//       galleryImages: [''], // New field
//       status: ['', Validators.required],
//     });
//   }


//   ngOnInit() {
//     this.loadProperties();
//   }

//   toggle() {
//     this.isVisible = !this.isVisible;
//   }

//   // Handle file selection
//   onFileSelected(event: any) {
//     this.selectedFiles = event.target.files;
//   }

//   loadProperties(): void {
//     this.PropertyService.getAllProperties().subscribe((data: any[]) => {
//       this.properties = data;
//     });
//   }

//   deleteProperty(propertyId: number): void {
//     if (confirm('Are you sure you want to delete this property?')) {
//       // console.log("Responsecdfvdfv",propertyId)
//       this.PropertyService.deleteProperty(propertyId).subscribe({
//         next: (response) => {
//           console.log('Property deleted successfully', response);
//         },
//         error: (error) => {
//           console.error('Error deleting property', error);
//         },
//       });
//     }
//   }

//   onSubmit() {
//     if (this.propertyForm.valid) {
//       const formData = new FormData();
//       // Convert amenities and galleryImages to arrays
//       const amenitiesArray = this.propertyForm.value.amenities ? this.propertyForm.value.amenities.split(',') : [];
//       const galleryImagesArray = this.propertyForm.value.galleryImages ? this.propertyForm.value.galleryImages.split(',') : [];

//       const propertyData = {
//         ...this.propertyForm.value,
//         amenities: amenitiesArray,
//         galleryImages: galleryImagesArray,
//         admin: { adminId: 1 }
//       };

//       formData.append('property', JSON.stringify(propertyData));

//       if (this.selectedFiles) {
//         Array.from(this.selectedFiles).forEach((file) => {
//           formData.append('profilePictures', file);
//         });
//       }

//       formData.append('recipientEmail', this.recipientEmail);

//       this.PropertyService.saveProperty(propertyData, this.selectedFiles || undefined, this.agentId, this.recipientEmail)
//         .subscribe(
//           (response) => {
//             console.log('Property saved:', response);
//             alert('Property saved successfully');
//             this.propertyForm.reset();
//           },
//           (error) => {
//             console.error('Error:', error);
//           }
//         );
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin.service';
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
  properties: Property[] = [];
  selectedProperty: Property | null = null;
  selectedFiles: FileList | null = null;
  propertyForm: FormGroup;
  updateForm: FormGroup;
  agentId: number = 1;
  recipientEmail: string = "akkiraj7531@gmail.com";
  isVisible = true;

  constructor(private fb: FormBuilder, private adminService: AdminService, private propertyService: PropertyService) {
    // Form for Adding Property
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
      amenities: [''],
      proximity: [''],
      galleryImages: [''],
      status: ['', Validators.required],
    });

    // Form for Updating Property
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      size: [0, Validators.required],
      address: ['', Validators.required],
      yearBuilt: [null, Validators.required],
      propertyType: ['', Validators.required],
      bedrooms: [0, Validators.required],
      bathrooms: [0, Validators.required],
      features: [''],
      status: ['', Validators.required],
      amenities: [''],
      proximity: [''],
      galleryImages: [''],
      admin: this.fb.group({
        adminId: [0, Validators.required]
      })
    });
  }

  ngOnInit() {
    this.loadProperties();
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  // Load all properties
  loadProperties(): void {
    this.propertyService.getAllProperties().subscribe(
      (data: Property[]) => {
        this.properties = data;
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
        this.updateForm.patchValue(property);
        console.log('Fetched Property:', property);
      },
      (error) => console.error('Error fetching property:', error)
    );
  }

  // Add a new property
  onSubmit() {
    if (this.propertyForm.valid) {
      const formData = new FormData();

      // Convert amenities & galleryImages to arrays
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
          formData.append('files', file);
        });
      }

      formData.append('recipientEmail', this.recipientEmail);

      this.propertyService.saveProperty(propertyData, this.selectedFiles || undefined, this.agentId, this.recipientEmail)
        .subscribe(
          (response) => {
            console.log('Property saved:', response);
            alert('Property saved successfully');
            this.propertyForm.reset();
            this.loadProperties(); // Refresh property list
          },
          (error) => console.error('Error:', error)
        );
    }
  }

  // Update an existing property
  updateProperty(): void {
    if (this.selectedProperty) {
      const formData = new FormData();

      // Convert form value to JSON
      const propertyJson = JSON.stringify(this.updateForm.value);
      formData.append("property", propertyJson);

      // Add multiple files
      if (this.selectedFiles) {
        Array.from(this.selectedFiles).forEach((file) => {
          formData.append("files", file);
        });
      }

      if (confirm("Are you sure you want to update this property?")) {
        this.propertyService.updateProperty(this.selectedProperty.propertyId!, formData).subscribe(
          (response) => {
            console.log("Property updated successfully:", response);
            alert("Property updated successfully");
            this.selectedProperty = null;
            this.updateForm.reset();
            this.selectedFiles = null;
            this.loadProperties(); // Refresh property list
          },
          (error) => console.error("Error updating property:", error)
        );
      }
    }
  }
}


