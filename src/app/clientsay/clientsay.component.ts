import { Component } from '@angular/core';

@Component({
  selector: 'app-clientsay',
  templateUrl: './clientsay.component.html',
  styleUrls: ['./clientsay.component.css']
})


export class ClientsayComponent {
  testimonials = [
    { content: "Testimonial 1", name: "Client 1", profession: "Designer", avatar: "assets/team/team-1.jpg" },
    { content: "Testimonial 2", name: "Client 2", profession: "Developer", avatar: "assets/team/team-2.jpg" },
    { content: "Testimonial 3", name: "Client 3", profession: "Manager", avatar: "assets/team/team-3.jpg" },
    { content: "Testimonial 4", name: "Client 4", profession: "CEO", avatar: "assets/team/team-4.jpg" },
    { content: "Testimonial 5", name: "Client 5", profession: "HR", avatar: "assets/team/team-4.jpg" },
    { content: "Testimonial 6", name: "Client 6", profession: "Engineer", avatar: "assets/team/team-4.jpg" },
  ];

  currentSlideIndex = 0;
  slidesToShow = 2;  // Showing 2 cards per slide
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
}

