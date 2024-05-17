import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../../services/user/user.service';
import { iuser } from '../../../Models/iuser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userFrame:string='./../../assets/images/user2.png'
  egyptianCities: string[] = ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan']; // Add more cities as needed
  selectedCity: string | undefined;
  resumeFileName: string | undefined;
  userProfile!:iuser;

  constructor(public userService:UserService){}
  async ngOnInit(): Promise<void> {
    this.userProfile = await this.userService.getUserInfo();
    
    if (this.userProfile.resume) {
      this.resumeFileName = this.extractFileNameFromUrl(this.userProfile.resume);
    }
  }
  
  private extractFileNameFromUrl(url: string): string | undefined {
    const decodedUrl = decodeURIComponent(url); // Decode the URL
    const parts = decodedUrl.split('/'); // Split the URL by '/'
    const lastPart = parts[parts.length - 1]; // Get the last part of the URL
  
    if (lastPart.includes('?')) {
      // If the last part contains query parameters, remove them
      const fileNameParts = lastPart.split('?');
      return fileNameParts[0];
    }
  
    return lastPart;
  }

}
