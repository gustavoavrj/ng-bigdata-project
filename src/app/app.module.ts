import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthguardService }  from './service/authguard.service';
import { RegisterComponent } from './register/register.component';
import { DataService } from './service/data.service';
import { RouterModule, Router } from '@angular/router';
import { LandingboardComponent } from './landingboard/landingboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    LandingboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [
    AuthguardService,
    DataService,
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
