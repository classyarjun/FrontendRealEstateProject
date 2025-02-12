import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})

export class AboutUsComponent {
  mission = {
    title: 'Our Mission',
    content: 'Our mission is simple: to provide exceptional real estate services backed by cutting-edge technology and expert knowledge. Whether you\'re a first-time homebuyer, an experienced investor, or looking to sell your property, we offer personalized solutions to match your unique needs.'
  };

  vision = {
    title: 'Our Vision',
    content: 'We aspire to be the leading real estate solutions provider, bridging the gap between technology and real estate. Our goal is to create a platform where you can find reliable resources, tools, and expertise, empowering you to make decisions with confidence.'
  };
}


