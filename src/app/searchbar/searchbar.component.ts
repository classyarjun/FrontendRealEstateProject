
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})

export class SearchbarComponent {

  selectedType: string = 'buy';  // Default Buy
  selectedProperty: string = '';
  location: string = '';
  propertyOptions: string[] = [];

  constructor(private router: Router) {
    this.updatePropertyTypes(); // Initialize property options
  }

  // Update property dropdown based on Buy/Rent selection
  updatePropertyTypes() {
    if (this.selectedType === 'buy') {
      this.propertyOptions = ['Residential', 'Commercial', 'Luxury Property', 'Land','Apartment', 'Villa', 'Office Space'];
    } else {
      this.propertyOptions = ['Apartment', 'Villa', 'Office Space'];
    }
    this.selectedProperty = ''; // Reset selected property
  }

  // Navigate to search results page
  searchProperties() {
    this.router.navigate(['/search-results'], {
      queryParams: {
        type: this.selectedType,
        property: this.selectedProperty,
        location: this.location
      }
    });
  }
}
