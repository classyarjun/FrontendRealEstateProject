import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  pendingProperties: any[] = [];

  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    this.fetchPendingProperties();
  }

  fetchPendingProperties(): void {
    this.AdminService.getAllPendingProperties().subscribe({
      next: (data: any[]) => {
        this.pendingProperties = data;
        // console.log('Pending Properties:', data);
      },
      error: (err: any) => {
        console.error('Error fetching pending properties:', err);
      }
    });
  }


  approveProperty(tempPropertyId: number): void {
    const adminId = 1; //repalce your admin id here
    this.AdminService.approveProperty(tempPropertyId, adminId).subscribe({
      next: (response: string) => {
        alert('Property Approved Successfully!');
        this.fetchPendingProperties();
      },
      error: (err: any) => {
        console.error('Error approving property:', err);
        alert('Error approving property!');
      }
    });
  }

  rejectProperty(tempPropertyId: number): void {
    const adminId = 1; //repalce your admin id here
    this.AdminService.rejectProperty(tempPropertyId, adminId).subscribe({
      next: (response: string) => {
        alert('Property rejected successfully!');
        this.fetchPendingProperties();
      },
      error: (err: any) => {
        console.error('Error rejecting property:', err);
        alert('Error rejecting property!');
      }
    });
  }
}
