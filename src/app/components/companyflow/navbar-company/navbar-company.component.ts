import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar-company',
  templateUrl: './navbar-company.component.html',
  styleUrl: './navbar-company.component.css',
})
export class NavbarCompanyComponent {
  wovac: string = './../../assets/images/Frame 7.png';
  isNavbarCollapsed = true;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  constructor(public router: Router ,public authService:AuthService) {}
  logout(event: any) {
    console.log("aloooo")
    localStorage.clear();
    console.log(localStorage.getItem('company_id'))
    this.authService.isCompany = false;
    this.authService.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
