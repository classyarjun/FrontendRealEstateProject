import { Component } from '@angular/core';

@Component({
  selector: 'app-clientsay',
  templateUrl: './clientsay.component.html',
  styleUrls: ['./clientsay.component.css']
})


export class ClientsayComponent {
  testimonials = [
    { content: "The Nest Propify helped me find my dream home effortlessly. The process was smooth, and their team was highly professional!", name: "Rahul Mehta", profession: "IT Consultant", avatar: "/assets/profile pic/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray (1).jpg", rating: 5 },
    { content: "I was skeptical about investing in real estate, but their expert guidance made everything so easy. Highly recommended!", name: "Priya Sharma", profession: "Marketing Manager", avatar: "/assets/profile pic/closeup-young-female-professional-making-eye-contact-against-colored-background (1).jpg", rating: 4 },
    { content: "Transparent dealings and a great selection of properties. I'm glad I chose them for my first investment!", name: "Ankit Verma", profession: "Business Owner", avatar: "/assets/profile pic/office-happy-man-work.jpg", rating: 5 },
    { content: "Customer support was excellent! They patiently answered all my queries and helped me make an informed decision!", name: "Neha Kapoor", profession: "Doctor", avatar: "/assets/profile pic/portrait-caucasian-woman-smiling.jpg", rating: 4 },
    { content: "A fantastic experience! The team was professional and guided me through every step of the property purchase. Highly recommend!", name: "Sarah Smith", profession: "HR Manager", avatar: "/assets/profile pic/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg", rating: 4 },
    { content: "A hassle-free experience from start to finish. I got exactly what I was looking for. Great job!", name: "Amit Saxena", profession: "Software Engineer", avatar: "/assets/profile pic/office-happy-man-work.jpg", rating: 5 },
  ];

  currentSlideIndex = 0;
  slidesToShow = 3;
  autoSlideInterval: any;
  dotIndexes: number[] = [];

  ngOnInit() {
    this.calculateDots();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide(): void {
    if (this.currentSlideIndex < this.dotIndexes.length - 1) {
      this.currentSlideIndex += 1;
    } else {
      this.currentSlideIndex = 0;
    }
  }

  prevSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex -= 1;
    } else {
      this.currentSlideIndex = this.dotIndexes.length - 1;
    }
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
  }

  getSlideTransform(): string {
    return `translateX(-${this.currentSlideIndex * 100}%)`;
  }

  private calculateDots(): void {
    this.dotIndexes = Array.from({ length: Math.ceil(this.testimonials.length / this.slidesToShow) }, (_, i) => i);
  }

  getStars(rating: number) {
    return Array(rating).fill(0);
  }
}

