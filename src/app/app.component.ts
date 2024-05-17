import { Component, OnInit } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  // isCompany = false;
  // isLogged =  false;
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    const getCompany = localStorage.getItem('company');
    const logged = localStorage.getItem('logged');
    console.log(getCompany);
    if(logged==='true') this.authService.isLoggedIn=true;
    if (getCompany === 'true') this.authService.isCompany = true;
  }
}
