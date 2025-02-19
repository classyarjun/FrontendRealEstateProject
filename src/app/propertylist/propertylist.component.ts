

// // ? first testing

// import { Component } from '@angular/core';
// import * as bootstrap from 'bootstrap';

// @Component({
//   selector: 'app-propertylist',
//   templateUrl: './propertylist.component.html',
//   styleUrls: ['./propertylist.component.css']
// })
// export class PropertylistComponent {

//   properties = [
//     {
//     title: 'FRONTECH Dragon Warrior Gaming',
//     description: 'FRONTECH Dragon Warrior Gaming 4 in 1 Gaming Combo Set of Gaming Keyboard with RGB LED Backlit, Mouse with 1000 DPI, Mousepad and Premium Gaming Headphone with 40mm Driver Unit, (KB-0038, Black)',
//     size: '4000 feet square',
//     address: 'Aurangabad Maharastra India 431105',
//     yearBuilt: '2022',
//     propertyType: 'Gaming Combo Set',
//     bedrooms: '3',
//     bathrooms: '4',
//     amenities: ['RGB LED Backlit', '1000 DPI Mouse', 'Mousepad', 'Premium Gaming Headphone'],
//     features: '4 in 1 Gaming Combo Set',
//     status: 'ACTIVE',
//     availability: 'AVAILABLE',
//     proximity: 'N/A',
//     price: '₹1.5 Cr',
//     images: ['/assets/homeimages/10.png', '/assets/homeimages/6.png', '/assets/homeimages/7.png', '/assets/homeimages/7.png'],
//     rating: 4.5

//   },
//     {
//     title: 'FRONTECH Dragon Warrior Gaming',
//     description: 'FRONTECH Dragon Warrior Gaming 4 in 1 Gaming Combo Set of Gaming Keyboard with RGB LED Backlit, Mouse with 1000 DPI, Mousepad and Premium Gaming Headphone with 40mm Driver Unit, (KB-0038, Black)',
//     size: '4000 feet square',
//     address: 'Aurangabad Maharastra India 431105',
//     yearBuilt: '2022',
//     propertyType: 'Gaming Combo Set',
//     bedrooms: '3',
//     bathrooms: '4',
//     amenities: ['RGB LED Backlit', '1000 DPI Mouse', 'Mousepad', 'Premium Gaming Headphone'],
//     features: '4 in 1 Gaming Combo Set',
//     status: 'ACTIVE',
//     availability: 'AVAILABLE',
//     proximity: 'N/A',
//     price: '₹1.5 Cr',
//     images: ['/assets/homeimages/10.png', '/assets/homeimages/6.png', '/assets/homeimages/7.png', '/assets/homeimages/7.png'],
//     rating: 4.5

//   },

//   ];

//   selectedProperty: any = null;
//   selectedImage: string | null = null;

//   openModal(property: any) {
//     this.selectedProperty = property;
//     this.selectedImage = property.images[0]; // Default image
//     const modalElement = document.getElementById('propertyModal');
//     if (modalElement) {
//       let modal = new bootstrap.Modal(modalElement);
//       modal.show();
//     }
//   }

//   changeImage(image: string) {
//     this.selectedImage = image;
//   }
// }

import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.css']
})
export class PropertylistComponent {

  properties = [
    {
      title: 'FRONTECH Dragon Warrior Gaming',
      description: 'FRONTECH Dragon Warrior Gaming 4 in 1 Gaming Combo Set of Gaming Keyboard with RGB LED Backlit, Mouse with 1000 DPI, Mousepad and Premium Gaming Headphone with 40mm Driver Unit, (KB-0038, Black)',
      size: '4000 feet square',
      address: 'Aurangabad Maharastra India 431105',
      yearBuilt: '2022',
      propertyType: 'Gaming Combo Set',
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
