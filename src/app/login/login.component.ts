import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Router,  NavigationExtras,ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataService]
})
 
export class LoginComponent implements OnInit {
  @ViewChild('username') el:ElementRef;
  statuslogin:any;
  focusin: boolean = true;
  rForm: FormGroup;
  post:any;  
  usernameAlert:string="Please fill username";
  passwordAlert:string="Please fill password";
  loginAlert:string;
  loginError:boolean=false;
  returnUrl: string;
  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private authenticationservice:DataService,    
      public router: Router
    ) {
    this.rForm = fb.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
   }
   ngOnInit() {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
}
 
  addPost(post) {
  if (post['username'] == "admin" && post['password'] == "admin"){
    localStorage.setItem('currentUser', post['username']);
    console.log('ok')
    this.router.navigate([this.returnUrl]);
  }else{
    this.loginError = true
    this.loginAlert =' error';
  }
   
  }
 
}