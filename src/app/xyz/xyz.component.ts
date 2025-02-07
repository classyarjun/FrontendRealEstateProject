import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/services/property.service';
import { Property } from '../../modal/property';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})

export class XyzComponent implements OnInit {
  updateForm!: FormGroup;
  selectedProperty!: Property | null;
  property: Property[] = [];
  selectedFiles: FileList | null = null;
  properties: Property[]= [];

  constructor(private fb: FormBuilder, private propertyService: PropertyService) {}

  ngOnInit(): void {
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
      galleryImages: [''], // New field
      admin: this.fb.group({
        adminId: [0, Validators.required]
      })
    });
    this.loadAllProperty();
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }


  loadAllProperty(): void {
    this.propertyService.getAllProperties().subscribe(
      (property) => {
        this.property = property;
        console.log("Fetched Properties:", this.property.length); //
      },
      (error) => console.error("Error fetching property:", error)
    );
  }

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

  updateProperty(): void {
    if (this.selectedProperty) {
      const formData = new FormData();

      // convert form value to JSON
      const propertyJson = JSON.stringify(this.updateForm.value);
      formData.append("property", propertyJson);  // send to JSON as String

      // Add to Multiple files in FormData
      if (this.selectedFiles) {
        Array.from(this.selectedFiles).forEach((file) => {
          formData.append("files", file);
        });
      }

      // API call to update property
      if(confirm("Are you sure you want to update this property?")){

      this.propertyService.updateProperty(this.selectedProperty.propertyId!, formData).subscribe(
        (response) => {
          console.log("Property updated successfully:", response);
          this.selectedProperty = null;
          this.updateForm.reset();
          this.selectedFiles = null;
        },
        (error) => console.error("Error updating property:", error)
      );
    }
  }

  }

}
