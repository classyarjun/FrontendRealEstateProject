
import { Component, OnInit } from '@angular/core';
import { Property } from '../../modal/property';
import { PropertyService } from './../../services/property.service';


@Component({
  selector: 'app-recent-listed',
  templateUrl: './recent-listed.component.html',
  styleUrls: ['./recent-listed.component.css']
})

export class RecentListedComponent implements OnInit{

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


