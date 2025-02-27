
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../modal/property';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  type: string = '';
  property: string = '';
  location: string = '';
  searchResults: Property[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.property = params['property'];
      this.location = params['location'];
      this.searchProperties();
    });
  }

  searchProperties() {
    this.loading = true;
    this.propertyService.searchProperties(this.property,)
      .subscribe({
        next: (properties) => {
          this.searchResults = properties;
          console.log("from search result:",this.searchResults);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to fetch properties';
          this.loading = false;
          console.error('Error fetching properties:', error);
        }
      });
  }

  properties = [
    {
      title: 'FRONTECH Dragon Warrior Gaming',
      description: 'FRONTECH Dragon Warrior Gaming 4 in 1 Gaming Combo Set of Gaming Keyboard with RGB LED Backlit, Mouse with 1000 DPI, Mousepad and Premium Gaming Headphone with 40mm Driver Unit, (KB-0038, Black)',
      size: '4000',
      address: 'Aurangabad Maharastra India 431105',
      yearBuilt: '2022',
      propertyType:'Residential',
      bedrooms: '3',
      bathrooms: '4',
      amenities: ['RGB LED Backlit', '1000 DPI Mouse', 'Mousepad', 'Premium Gaming Headphone'],
      features: '4 in 1 Gaming Combo Set',
      status: 'ACTIVE',
      availability: 'AVAILABLE',
      proximity: 'N/A',
      price: '₹1.5 Cr',
      images: [
        '/assets/homeimages/10.png',
        '/assets/homeimages/6.png',
        '/assets/homeimages/7.png',
        '/assets/homeimages/9.png'
      ],
      rating: 4.5
    }
  ];

  selectedProperty: any = null;
  selectedImage: string | null = null;
  selectedIndex: number = 0;

  openModal(property: any) {
    this.selectedProperty = property;
    this.selectedImage = property.images[0]; // Default image
    this.selectedIndex = 0;
    const modalElement = document.getElementById('propertyModal');
    if (modalElement) {
      let modal = new bootstrap.Modal(modalElement);
      modal.show();
    }

    setTimeout(() => {
      let carouselElement = document.getElementById('propertyCarousel');
      if (carouselElement) {
        let carousel = new bootstrap.Carousel(carouselElement);
        carouselElement.addEventListener('slid.bs.carousel', (event: any) => {
          this.selectedIndex = event.to; // Sync active image with thumbnail
          this.selectedImage = this.selectedProperty?.images[this.selectedIndex];
        });
      }
    }, 500);
  }

  changeImage(index: number) {
    this.selectedIndex = index;
    this.selectedImage = this.selectedProperty?.images[index];

    let carouselElement = document.getElementById('propertyCarousel');
    if (carouselElement) {
      let carousel = new bootstrap.Carousel(carouselElement);
      carousel.to(index); // Move carousel to clicked image
    }
  }
}
