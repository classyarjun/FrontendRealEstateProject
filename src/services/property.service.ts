import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../modal/property';
import { environment } from '../environments/environment'; // Import environment
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  // private apiUrl = 'http://localhost:8080/api/properties';

  private apiUrl = environment.apiUrl; //?  apiUrl: 'http://localhost:8080/api',


  // ✅ State management ke liye BehaviorSubject
  private propertiesSubject = new BehaviorSubject<Property[]>([]);
  properties$ = this.propertiesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProperties(); // ✅ Initialize data
  }

  /** ✅ Get All Properties & Update Subject */
  private loadProperties(): void {
    this.getAllProperties().subscribe(
      (data) => this.propertiesSubject.next(data),
      (error) => console.error('Error fetching properties:', error)
    );
  }

  //? it is working code in xyz component
  addProperty(agentId: number, formData: FormData): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/properties/addProperty/${agentId}`,
      formData
    );
  }

  /** Get All Pending Properties */
  getAllPendingProperties(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/properties/getAllPendingProperties`
    );
  }

  // approveProperty(propertyId: number): Observable<string> {
  //   return this.http.put<string>(
  //     `${this.apiUrl}/properties/approveProperty/${propertyId}`,
  //     {}
  //   );
  // }


    /** ✅ Approve Property & Refresh List */
    approveProperty(propertyId: number): Observable<string> {
      return this.http.put<string>(`${this.apiUrl}/properties/approveProperty/${propertyId}`, {})
        .pipe(
          tap(() => this.loadProperties()) // ✅ Auto refresh state
        );
    }

  /** Reject Property */
  rejectProperty(propertyId: number): Observable<string> {
    return this.http.delete<string>(
      `${this.apiUrl}/properties/rejectProperty/${propertyId}`,
      {}
    );
  }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties/getAllTheProperties`);
  }

  getPropertyById(propertyId: number): Observable<Property> {
    return this.http.get<Property>(
      `${this.apiUrl}/properties/getPropertyByIds/${propertyId}`
    );
  }
  getPendingPropertiesByAgent(
    propertyId: number,
    agentId: number
  ): Observable<Property> {
    return this.http.get<Property>(
      `${this.apiUrl}/properties/getPendingPropertiesByAgent/${propertyId}/${agentId}`
    );
  }

  updateProperty(propertyId: number, propertyData: FormData ): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/properties/updateProperty/${propertyId}`,propertyData);
  }

  deleteProperty(propertyId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/properties/deleteProperty/${propertyId}`
    );
  }

  searchProperties(keyword: string): Observable<Property[]> {
    return this.http.get<Property[]>(
      `${this.apiUrl}/properties/search/${keyword}`
    );
  }
}
