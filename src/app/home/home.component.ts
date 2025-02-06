
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


  export class HomeComponent implements OnInit, OnDestroy {
    images = [
      '/assets/homeimages/property1.png',
      '/assets/homeimages/property2.png',
      '/assets/homeimages/property3.png',
      // '/assets/homeimages/4.png'
    ];

    currentImageIndex = 0;
    interval: any;

    ngOnInit() {
      this.startAutoSlide();
    }

    ngOnDestroy() {
      if (this.interval) {
        clearInterval(this.interval);  // Clear the interval when the component is destroyed
      }
    }

    startAutoSlide() {
      this.interval = setInterval(() => {
        this.nextImage();
      }, 3000); // Change the image every 3 seconds
    }

    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }

    previousImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    }
  }

