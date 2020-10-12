import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable()
export class DataService {
  constructor() { }
  login(post): Observable<any> {
 
    if (post['username']== "admin" && post['password'] == "admin")  
   {
      
      localStorage.setItem('currentUser', post['username']);
      return post['username']
    }
    
  }
 
  logout() {
    localStorage.removeItem('currentUser');
  }
  
}