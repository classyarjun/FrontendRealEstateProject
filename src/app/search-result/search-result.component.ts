
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
}
