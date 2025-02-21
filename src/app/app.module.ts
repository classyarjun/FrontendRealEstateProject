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
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import this
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
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
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServicepageComponent } from './servicepage/servicepage.component';
import { PropertyTypeComponent } from './property-type/property-type.component';
import { PropertyAgentComponent } from './property-agent/property-agent.component';
import { ClientsayComponent } from './clientsay/clientsay.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { SideMapsComponent } from './side-maps/side-maps.component';
import { BlogComponent } from './blog/blog.component';
import { PropertylistComponent } from './propertylist/propertylist.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AdminLoginComponent } from './adminlogin/adminlogin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    UserregisterComponent,
    UserloginComponent,
    AgentregisterComponent,
    AgentloginComponent,
    AdminregisterComponent,
    NavbarComponent,
    ContactusComponent,
    FooterComponent,
    HomeComponent,
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
    AdminpanelComponent,
    AboutUsComponent,
    ServicepageComponent,
    PropertyTypeComponent,
    PropertyAgentComponent,
    ClientsayComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    SideMapsComponent,
    BlogComponent,
    PropertylistComponent,
    SearchResultComponent,
    AdminLoginComponent,
    NotFoundComponent

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

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // ✅ Register Interceptor
  ],

  bootstrap: [AppComponent]

})
export class AppModule { }
