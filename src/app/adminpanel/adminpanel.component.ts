import { AgentService } from 'src/services/agent.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
// import { AdminService } from './../../services/admin.service';
import { PropertyService } from 'src/services/property.service';
Chart.register(...registerables);

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})

export class AdminpanelComponent implements OnInit {
  pendingProperties: any[] = [];
  pendingAgents: any[] = [];
  isVisible = true;
  toggle() {
    this.isVisible = !this.isVisible;
  }

  salesChart: any;
  propertyTypeChart: any;

  constructor( private AgentService: AgentService, private PropertyService:PropertyService) { }



  ngOnInit() {
    this.createSalesChart();
    this.createPropertyTypeChart();
    this.loadPendingAgents();
    this.fetchPendingProperties();

  }

  createSalesChart() {
    this.salesChart = new Chart('salesChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales (in millions)',
          data: [1.2, 1.5, 1.3, 1.7, 1.9, 2.1],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPropertyTypeChart() {
    this.propertyTypeChart = new Chart('propertyTypeChart', {
      type: 'pie',
      data: {
        labels: ['Residential', 'Commercial', 'Industrial', 'Land'],
        datasets: [{
          data: [60, 25, 10, 5],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Property Type Distribution'
          }
        }
      }
    });
  }


  // fetchPendingProperties(): void {
  //   this.AdminService.getAllPendingProperties().subscribe({
  //     next: (data: any[]) => {
  //       this.pendingProperties = data;
  //       console.log('Pending Properties:', data);
  //     },
  //     error: (err: any) => {
  //       console.error('Error fetching pending properties:', err);
  //     }
  //   });
  // }

  // approveProperty(tempPropertyId: number): void {
  //   const adminId = 1; //repalce your admin id here
  //   this.AdminService.approveProperty(tempPropertyId, adminId).subscribe({
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

// ! Agents manage code

  loadPendingAgents(): void {
    this.AgentService.getAllPendingAgents().subscribe(
      (agents) => {
        this.pendingAgents = agents;
        console.log('Admin panel Pending agents', agents);
      },
      (error) => {
        console.error('Error fetching agents:', error);
      }
    );
  }

  approveAgent(id: number): void {
    this.AgentService.approveAgent(id).subscribe(
      () => {
        alert('Agent approved successfully!');
        this.loadPendingAgents();
      },
      (error) => {
        console.error('Approval failed:', error);
      }
    );
  }

  rejectAgent(id: number): void {
    this.AgentService.rejectAgent(id).subscribe(
      () => {
        alert('Agent rejected successfully!');
        this.loadPendingAgents();
      },
      (error) => {
        console.error('Rejection failed:', error);
      }
    );
  }

// ! properties manage code
  fetchPendingProperties(): void {
    this.PropertyService.getAllPendingProperties().subscribe({
      next: (data: any[]) => {
        this.pendingProperties = data;
        console.log('Admin panel Pending Properties:', data);
      },
      error: (err: any) => {
        console.error('Error fetching pending properties:', err);
      }
    });
  }

  approveProperty(propertyId: number): void {
    this.PropertyService.approveProperty(propertyId).subscribe({
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

  rejectProperty(propertyId: number): void {
    this.PropertyService.rejectProperty(propertyId).subscribe({
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







