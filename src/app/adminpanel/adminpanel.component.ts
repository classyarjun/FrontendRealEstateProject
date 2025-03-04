import { UserService } from 'src/services/user.service';
import { BlogService } from 'src/services/blog.service';
import { AgentService } from 'src/services/agent.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService } from 'src/services/admin.service';
import { PropertyService } from 'src/services/property.service';
import { Blog } from 'src/modal/blog';
import { Property } from 'src/modal/property';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../Modals/user';
Chart.register(...registerables);

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})

export class AdminpanelComponent implements OnInit {
  pendingProperties: any[] = [];
  allProperties: Property[] = [];
  propertylength:number = 0;
  pendingAgents: any[] = [];
  allUsers:User[] = [];
  isVisible = true;


  adminId: any;
  adminData:any;

  toggle() {
    this.isVisible = !this.isVisible;
  }

  salesChart: any;
  propertyTypeChart: any;

  blogs: Blog[] = [];

    blog: Blog = {
      title: '',
      date: new Date(),
      description: '',
    };
    imageFile?: File;

  constructor( private AgentService: AgentService,
     private PropertyService: PropertyService,
     private blogService: BlogService,
    private UserService:UserService,
    private AuthService:AuthService,
    private AdminService:AdminService,


    private router: Router) { }

  ngOnInit() {


    const adminId = this.AuthService.getRoleId('adminId'); // ✅ Role-wise ID retrieve karein
  // console.log(adminId);
  //  this.adminId = adminId ? +adminId : 0;
   this.adminId = adminId;
  if (adminId) {
    this.AdminService.getAdminById(+adminId).subscribe({
      next: (data) => {
        this.adminData = data;
        // console.log('Admin All Data:', data);
      },
      error: (err) => console.error('Error fetching agent profile:', err)
    });
  }


    this.createSalesChart();
    this.createPropertyTypeChart();
    this.loadPendingAgents();
    this.fetchPendingProperties();
    this.loadBlogs();
    this.loadProperties();
    this. loadAllUsers();
  }

  getProfileImage(): string {
    if (this.adminData?.profilePicture) {
      return `data:image/jpeg;base64,${this.adminData.profilePicture}`;
    }
    return 'https://via.placeholder.com/100';
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

  onFileChange(event: any): void {
    this.imageFile = event.target.files[0];
  }
// ! Agents manage code

  loadPendingAgents(): void {
    this.AgentService.getAllPendingAgents().subscribe(
      (agents) => {
        this.pendingAgents = agents;
        // console.log('Admin panel Pending agents', agents);
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


  fetchPendingProperties(): void {
    this.PropertyService.getAllPendingProperties().subscribe({
      next: (data: any[] | null) => {
        this.pendingProperties = data || [];
        this.propertylength = this.pendingProperties.length;
      },
      error: (err: any) => {
        console.error('Error fetching pending properties:', err);
        this.pendingProperties = [];
        this.propertylength = 0;
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



saveBlog(): void {
    if (this.imageFile) {
      this.blogService.saveBlog(this.blog, this.imageFile).subscribe(
        (data) => {
          alert('Blog saved successfully:');
          console.log('Blog saved successfully:', data);
        },
        (error) => {
          console.error('Error saving blog:', error);
        }
      );
      this.loadBlogs();
    }
  }



  loadBlogs(): void {
    this.blogService.getAllBlogs().subscribe((data: Blog[]) => {
        this.blogs = data.map(blog => {
        blog.imagePath = `data:image/jpeg;base64,${blog.imagePath}`;
        return blog;
      });
    });
  }



  deleteBlog(id: number): void {
    if(confirm('Are you sure you want to delete this blog?')){
    this.blogService.deleteBlog(id).subscribe(
      () => {
        this.blogs = this.blogs.filter((blog) => blog.id !== id);
      },
      (error) => {
        console.error('Error deleting blog:', error);
      }
    );
    this.loadBlogs();
  }
}


loadProperties(): void {
    this.PropertyService.getAllProperties().subscribe(
      (data: Property[]) => {
        this.allProperties = data || [];
        // console.log('AllProperties:', data);
      },
      (error) => console.error("Error fetching properties:", error)
    );
  }


  loadAllUsers():void {
    this.UserService.getAllUsers().subscribe(
      (data:User[])=>{
      this.allUsers=data || [];
      // console.log("Allusers:", data);
    },
     (error) => console.error("Error fetching users:", error))

    }


  logout() {
    if(confirm('Are you sure you want to logout?')){
      this.AuthService.logout('admin_token');
      alert('Logged out successfully');
      this.router.navigate(['']);
    }
  }


}







