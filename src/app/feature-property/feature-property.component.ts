import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-property',
  templateUrl: './feature-property.component.html',
  styleUrls: ['./feature-property.component.css']
})
export class FeaturePropertyComponent {
  constructor(private router: Router) {}


searchresultnevigate(){
this.router.navigate(['/search-result']);

}

}
