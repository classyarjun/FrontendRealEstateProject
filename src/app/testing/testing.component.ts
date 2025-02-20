import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin.service';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent  {
  // pendingProperties: any[] = [];


  // adminId: number | null = null;

  // constructor(private adminService: AdminService, private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.adminId = this.authService.getAdminId();
  //   this.fetchPendingProperties();
  // }

  // fetchPendingProperties(): void {
  //   this.adminService.getAllPendingProperties().subscribe({
  //     next: (data: any[]) => {
  //       this.pendingProperties = data;
  //       // console.log('Pending Properties:', data);
  //     },
  //     error: (err: any) => {
  //       console.error('Error fetching pending properties:', err);
  //     }
  //   });
  // }

  // approveProperty(tempPropertyId: number): void {
  //   const adminId = 1; //repalce your admin id here
  //   this.adminService.approveProperty(tempPropertyId, adminId).subscribe({
  //     next: (response: string) => {
  //       alert('Property Approved Successfully!');
  //       this.fetchPendingProperties();
  //     },
  //     error: (err: any) => {
  //       console.error('Error approving property:', err);
  //       alert('Error approving property!');
  //     }
  //   });
  // }


//   rejectProperty(tempPropertyId: number): void {
//     if (!this.adminId) {
//       alert('Admin ID not found!');
//       return;
//     }
//     this.adminService.rejectProperty(tempPropertyId, this.adminId).subscribe({
//       next: () => {
//         alert('Property rejected successfully!');
//       },
//       error: (err) => {
//         console.error('Error rejecting property:', err);
//         alert('Error rejecting property!');
//       }
//     });
//   }
// }


  // rejectProperty(tempPropertyId: number): void {
  //   const adminId = 1; //repalce your admin id here
  //   this.AdminService.rejectProperty(tempPropertyId, adminId).subscribe({
  //     next: (response: string) => {
  //       alert('Property rejected successfully!');
  //       this.fetchPendingProperties();
  //     },
  //     error: (err: any) => {
  //       console.error('Error rejecting property:', err);
  //       alert('Error rejecting property!');
  //     }
  //   });
  // }



}
