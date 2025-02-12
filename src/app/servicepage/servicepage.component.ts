import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
interface CarouselItem {
  images: string[];
  titles: string[];
  descriptions: string[];
}

@Component({
  selector: 'app-servicepage',
  templateUrl: './servicepage.component.html',
  styleUrls: ['./servicepage.component.css']
})



export class ServicepageComponent implements OnInit, OnDestroy {
  carouselItems: CarouselItem[] = [
    {
      images: [
        '/assets/RE Services images/Market Analysis.jpg',
        '/assets/RE Services images/Consulting.jpg',
        '/assets/RE Services images/Technology Tools.jpg',
      ],
      titles: ['Market Analysis', 'Consulting', 'Technology Tools'],
      descriptions: [
        ' Explain your data-driven insights and how they benefit clients,Evaluates direct and indirect competitors in the market.',
        'Offer expert real estate advice, including buying, selling, investing, and market trend analysis.',
        'Highlight any innovative technology tools you use, like AI-driven property search, virtual tours, etc.',
      ],
    },
    {
      images: [
        '/assets/RE Services images/Introduction to Services.jpg',
        '/assets/RE Services images/Property Buying Services.jpg',
        '/assets/RE Services images/Property Selling Services.jpg',
      ],
      titles: ['Introduction to Services', 'Property Buying Services', 'Property Selling Services'],
      descriptions: [
        'Start with a brief introduction to explain what clients can expect from your services..',
        'Detail the services for buyers, such as property search, price analysis, assistance with paperwork, and negotiation.',
        'Highlight services for sellers, including property valuation, listing, marketing, and dealing with legalities.',
      ],
    },
    {
      images: [
        '/assets/RE Services images/Renting and Leasing Services.jpg',
        '/assets/RE Services images/Property Management.jpg',
        '/assets/RE Services images/Real Estate Investment Consultation.jpg',
      ],
      titles: ['Renting and Leasing Services', 'Property Management', 'Real Estate Investment '],
      descriptions: [
        'If you offer renting or leasing services, mention tenant finding, lease agreement preparation.',
        'Detail the services for buyers, such as property search, price analysis, assistance with paperwork, and negotiation.',
        'Highlight services for sellers, including property valuation, listing, marketing, and dealing with legalities.',
      ],
    },
    {
      images: [
        '/assets/RE Services images/Home Staging and Renovation Services.jpg',
        '/assets/RE Services images/Market Insights and Analysis.jpg',
        '/assets/RE Services images/Contact and Consultation.jpg',
      ],
      titles: ['Home Staging and Renovation Services', 'Market Insights and Analysis', 'Contact and Consultation '],
      descriptions: [
        'applicable, offer staging or renovation to help clients increase property value.',
        'Include information on how your services offer clients a deep understanding of the market trends and property valuation..',
        'Provide an easy way for users to get in touch or schedule consultations for your services.',
      ],
    },
  ];

  currentSlide = 0;
  intervalId: any;
  isDesktopView = true; // Default to desktop view

  ngOnInit() {
    this.updateView();
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  @HostListener('window:resize', [])
  updateView() {
    this.isDesktopView = window.innerWidth > 768; // Detect screen width
  }
}

