import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgentregisterComponent } from './agentregister/agentregister.component';
import { AgentloginComponent } from './agentlogin/agentlogin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import this
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserComponent } from './user/user.component';
import { AgentComponent } from './agent/agent.component';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import { TestingComponent } from './testing/testing.component';
import { PropertyComponent } from './property/property.component';
import { RecentListedComponent } from './recent-listed/recent-listed.component';
import { OtpverifyregisterComponent } from './otpverifyregister/otpverifyregister.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { XyzComponent } from './xyz/xyz.component';



@NgModule({
  declarations: [
    AppComponent,
    UserregisterComponent,
    UserloginComponent,
    AgentregisterComponent,
    AgentloginComponent,
    AdminregisterComponent,
    AdminloginComponent,
    NavbarComponent,
    ContactusComponent,
    FooterComponent,
    HomeComponent,
    AdmindashboardComponent,
    UserComponent,
    AgentComponent,
    AgentdashboardComponent,
    TestingComponent,
    PropertyComponent,
    RecentListedComponent,
    OtpverifyregisterComponent,
    ResetpasswordComponent,
    SearchbarComponent,
    XyzComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
