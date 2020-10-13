import { Component } from '@angular/core';
import { AuthguardService } from './service/authguard.service';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DataService, AuthguardService ]
})
export class AppComponent {
  title = 'ng-bigdata-project';
}
