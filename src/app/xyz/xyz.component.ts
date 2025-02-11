import { AgentService } from 'src/services/agent.service';
import { AdminService } from './../../services/admin.service';
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
  propertyForm: FormGroup;
  selectedFiles: File[] = [];
  agentId: number = 9;

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

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
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
}
