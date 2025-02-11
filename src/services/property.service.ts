import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../modal/property';
import { environment } from '../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})


export class PropertyService {

  // private apiUrl = 'http://localhost:8080/api/properties';

  private apiUrl = environment.apiUrl; //?  apiUrl: 'http://localhost:8080/api',

  constructor(private http: HttpClient) {}

  saveProperty(property: Property, files?: FileList, agentId?: number, recipientEmail?: string): Observable<any> {
    const formData = new FormData();
    formData.append('property', JSON.stringify(property));

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('profilePictures', file);
      });
    }


    return this.http.post<any>(`${this.apiUrl}/properties/addProperty/${agentId}`, formData);
  }
  addProperty(agentId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties/addProperty/${agentId}`, formData);
  }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties/getAllProperties`);
  }


  getPropertyById(propertyId: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/properties/getPropertyById/${propertyId}`);
  }

  deleteProperty(propertyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/properties/deleteProperty/${propertyId}`);
  }

  updateProperty(propertyId: number, propertyData: FormData): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/properties/updateProperty/${propertyId}`, propertyData);
  }

  searchProperties(keyword: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties/search/${keyword}`);
  }

}
