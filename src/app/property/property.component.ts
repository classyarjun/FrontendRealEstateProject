import { Component, OnInit } from '@angular/core';
import { Property } from '../../modal/property';
import { PropertyService } from './../../services/property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit{


   property: Property[] = []

    constructor(private PropertyService: PropertyService) {}

    ngOnInit(): void {
      this.loadProperty()
    }

    loadProperty(): void {
      this.PropertyService.getAllProperties().subscribe(
        (property) => (this.property = property),
        (error) => console.error("Error fetching property:", error),
      )
    }


}


