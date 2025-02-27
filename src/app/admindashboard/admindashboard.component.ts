


//? testing code


import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService } from './../../services/admin.service';
import { Property } from 'src/modal/property';
import { PropertyService } from './../../services/property.service';
import { AgentService } from 'src/services/agent.service';

Chart.register(...registerables);

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})

export class AdmindashboardComponent {

  
}
