import { AuthService } from 'src/services/auth.service';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from 'src/services/agent.service';
import { Chart, registerables } from 'chart.js';
import { PropertyService } from 'src/services/property.service';
import { Property } from '../../modal/property';
import { Router } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.css']
})

// =======================================
export class AgentdashboardComponent implements OnInit {

  isVisible = true;
  property: Property[] = [];
  allProperties: Property[] = [];
  selectedProperty: Property | null = null;
  selectedFiles: File[] = [];
  propertyForm: FormGroup;
  updateForm: FormGroup;
  agentId: any;
  agentData:any;
  searchQuery: string = '';

  pendingPropertiesByAgent:any;

  constructor(private fb: FormBuilder, private PropertyService: PropertyService,
    private AuthService:AuthService,
    private AgentService:AgentService,
    private router: Router) {
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


ngOnInit(): void {
  const agentId = this.AuthService.getRoleId('agentId'); // ✅ Role-wise ID retrieve karein
  // console.log(agentId);
  //  this.agentId = agentId ? +agentId : 0;
   this.agentId = agentId;
  if (agentId) {
    this.AgentService.getAgentById(+agentId).subscribe({
      next: (data) => {
        this.agentData = data;
        console.log('Agent All Data:', data);
      },
      error: (err) => console.error('Error fetching agent profile:', err)
    });
  }

this.loadProperties();
this.loadPendingProperties();

}

getProfileImage(): string {
  if (this.agentData?.profilePicture) {
    return `data:image/jpeg;base64,${this.agentData.profilePicture}`;
  }
  return 'https://via.placeholder.com/100'; // Default Image
}

  toggle() {
    this.isVisible = !this.isVisible;
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
  }
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }


// Load selected property details for updating
loadProperty(propertyId: number): void {
  this.PropertyService.getPropertyById(propertyId).subscribe(
    (property) => {
      this.selectedProperty = property;
      console.log('Selected Property:', this.selectedProperty?.propertyId);  // Debugging line
      this.updateForm.patchValue(property);  // Populate the update form
    },
    (error) => console.error('Error fetching property:', error)
  );
}

// Load all properties
loadProperties(): void {
  this.PropertyService.getAllProperties().subscribe(
    (data: Property[]) => {
      this.allProperties = data;
      // console.log('agent panel getAllProperties:', data);
    },
    (error) => console.error("Error fetching properties:", error)
  );
}


// Delete a property by ID
deleteProperty(propertyId: number): void {
  if (confirm('Are you sure you want to delete this property?')) {
    this.PropertyService.deleteProperty(propertyId).subscribe({
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
    this.PropertyService.addProperty(this.agentId, formData).subscribe(
      (response) => {
        console.log('Property added:', response);
        alert('Property added successfully');
        this.propertyForm.reset();  // Reset the form
        this.selectedFiles = [];  // Reset selected files
      },
      (error) => console.error('Error:', error)
    );
  }
}


viewProperty(propertyId: number): void {
  this.PropertyService.getPropertyById(propertyId).subscribe(
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

    this.PropertyService.updateProperty(this.selectedProperty.propertyId, formData).subscribe(
      (response) => {
        console.log('Property updated:', response);
        alert('Property updated successfully');
        this.loadProperties(); // Refresh properties list
      },
      (error) => console.error('Error updating property:', error)
    );
  }
}

get filteredProperties(): Property[] {
  return this.allProperties.filter(property =>
    property.title.toLowerCase().includes(this.searchQuery) ||
    property.propertyType.toLowerCase().includes(this.searchQuery) ||
    property.address.toLowerCase().includes(this.searchQuery) ||
    property.features.toLowerCase().includes(this.searchQuery) ||
    property.amenities.some(amenity => amenity.toLowerCase().includes(this.searchQuery))||
    property.status.toLowerCase().includes(this.searchQuery)
  );
}

logout() {
  if(confirm('Are you sure you want to logout?')){
    this.AuthService.logout('agent_token');
    alert('Logged out successfully');
    this.router.navigate(['']);
  }
}

// loadPendingProperties(): void {
//   this.PropertyService.getPendingPropertiesByAgent(this.agentId).subscribe(
//     (property: Property) => {
//       this.pendingPropertiesByAgent =[property];
//       console.log('Pending Properties:', this.pendingPropertiesByAgent);

//     },
//     (error) => {
//       console.error('Error fetching pending properties:', error);
//     }
//   );
// }

loadPendingProperties(): void {
  this.PropertyService.getPendingPropertiesByAgent(this.agentId).subscribe(
      (property: Property) => {
        this.pendingPropertiesByAgent = property;
        console.log('getPendingPropertiesByAgent:', property);
      },
      (error) => console.error("Error fetching properties:", error)
    );
}


}





