// export class Property {
// }

export interface Property {
  propertyId?: number;
  title: string;
  price: number;
  size: number;
  address: string;
  yearBuilt: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  features: string;
  status: string;
  amenities: string[];      // List of amenities
  galleryImages: string[];  // List of image filenames
  proximity: string;        // Nearby locations info
  admin: { adminId: number }; // Admin details
}
