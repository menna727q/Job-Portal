import { Component,Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  wovac: string = './../../assets/images/Frame 7.png';
  isNavbarCollapsed = true;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  constructor(public router: Router , public authService:AuthService) {}
  async logout(event: any) {
    // localStorage.clear();
    localStorage.clear();
    this.authService.isCompany = false;
    this.authService.isLoggedIn = false;
    this.router.navigate(['/']);
  }  
  @Input() job: any; // Define the job property as an input

  // isLinkActive(routes: string[]): boolean {
  //   const currentRoute = this.router.url.split('/')[1]; // Get the current route
  //   return routes.some(route => currentRoute.includes(route.split('/')[1])); // Check if current route includes any of the specified routes
  // }
  

}
