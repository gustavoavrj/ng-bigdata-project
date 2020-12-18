import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { HomeComponent } from './home/home.component';
import { AuthguardService }  from './service/authguard.service';
import { LandingboardComponent } from './landingboard/landingboard.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AuthguardService ]},

  // otherwise redirect to home
  { path: '**', redirectTo: '/landing' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
