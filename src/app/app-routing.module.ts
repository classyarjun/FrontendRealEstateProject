import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { AgentloginComponent } from './agentlogin/agentlogin.component';
import { AgentregisterComponent } from './agentregister/agentregister.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminLoginComponent} from './adminlogin/adminlogin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
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
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SideMapsComponent } from './side-maps/side-maps.component';
import { PropertylistComponent } from './propertylist/propertylist.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [

  { path: '', component: HomeComponent},

  { path: 'navbar', component: NavbarComponent},
  { path: 'contactus', component: ContactusComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'testing', component: TestingComponent},
  { path: 'property', component: PropertyComponent},
  { path: 'recent', component: RecentListedComponent},
  { path: 'otpverifyregister', component: OtpverifyregisterComponent},
  { path: 'reset-password', component: ResetpasswordComponent},
  { path: 'xyz', component: XyzComponent},
  { path: 'search', component: SearchbarComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'servicepage', component: ServicepageComponent},
  { path: 'property-type', component: PropertyTypeComponent},
  { path: 'property-agent', component: PropertyAgentComponent},
  { path: 'client-say', component: ClientsayComponent},
  { path: 'side-maps', component: SideMapsComponent},

  { path: 'terms-conditions', component: TermsConditionsComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},

  { path: 'pl', component: PropertylistComponent},

  { path: 'search-results', component: SearchResultComponent },
  { path: 'search-results-wildcardroute', redirectTo: 'search-results' },

  { path: 'userregister', component: UserregisterComponent},
  { path: 'agentregister', component: AgentregisterComponent},
  { path: 'adminregister', component: AdminregisterComponent},

  { path: 'adminlogin', component: AdminLoginComponent},
  { path: 'userlogin', component: UserloginComponent},
  { path: 'agentlogin', component: AgentloginComponent},

  { path: 'adminpanel', component: AdminpanelComponent,canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  { path: 'home', component: HomeComponent,  canActivate: [AuthGuard], data: { role: 'USER' } },
  { path: 'agentpanel',component: AgentdashboardComponent, canActivate: [AuthGuard],data: { role: 'AGENT' } },
  { path: 'unauthorized', component: NotFoundComponent },

  { path: '**', redirectTo: 'unauthorized' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
