import { Component } from '@angular/core';

interface PropertyType {
  iconPath: string;
  name: string;
  count: number;
}

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.css']
})

export class PropertyTypeComponent {
  propertyTypes: PropertyType[] = [
    { iconPath: '/assets/icon for RE 2/icon/apartment.png  ', name: 'Apartment', count: 123 },
    { iconPath: '/assets/icon for RE 2/icon/villa.png', name: 'Villa', count: 123 },
    { iconPath: '/assets/icon for RE 2/icon/house.png', name: 'Home', count: 123 },
    { iconPath: '/assets/icon for RE 2/icon/office.png', name: 'Office', count: 123 },
    { iconPath: '/assets/icon for RE 2/icon/Buildings.png', name: 'Building', count: 123 },
    { iconPath: '/assets/icon for RE 2/icon/townhouse (1).png', name: 'Townhouse', count: 123 },
    { iconPath: '/assets/icon for RE 2/icon/shop.png', name: 'Shop', count: 123 },
    { iconPath: '/assets/icon for RE 2/icon/Garage1.png', name: 'Garage', count: 123 }
  ];
}



