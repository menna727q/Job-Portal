import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrl: './editcompany.component.css'
})
export class EditcompanyComponent {
  userFrame:string='./../../assets/images/user2.png'
  companyData:any
  showPassword: boolean = false;
  formData={
    email:'',
    name:'',
    phoneNumber:'',
    password:'',
    industry:'',
    overview:'',
    city:'',
    area:'',
    website:'',
    profilePicture:''
  }

  constructor(public companyService:CompanyService,private toast: HotToastService){}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  async ngOnInit(): Promise<void> {
    this.companyData =  await this.companyService.getCompanyInfo();
    // this.userData = this.userService.getUserInfo();
    // // Initialize formData with userData
    console.log(this.companyData)
    this.formData = { ...this.companyData };
  }
  eyeIcon = 'pi pi-eye';
  eyeSlashIcon = 'pi pi-eye-slash';

  async editProfile(event:any){
    console.log(this.formData);
    await this.companyService.editUserProfile(this.formData);
    if (this.companyData.profilePicture !== this.formData.profilePicture) {
      // If the profile picture has changed, update it in the user's database record
      this.companyData.profilePicture = this.formData.profilePicture;
      this.companyService.uploadImage(this.companyData.company_id, this.formData.profilePicture)
        .subscribe(
          () => {
            console.log('Profile picture updated successfully in database');
          },
          (error) => {
            console.error('Error updating profile picture in database:', error);
            // Show an error toast
            this.toast.error('There was an error updating the profile picture');
          }
        );
    }
  }
  async  uploadImage(event: any) {
    const file = event.target.files[0];
  
    if (!file) {
        return; // No file selected
    }   
    try {
      console.log("ana f try")
      const imageUrl = await this.companyService.uploadImage(file, `${this.companyData.company_id}`).toPromise()
     console.log(imageUrl,"mmmmmmmmmmmmmm")
      if (imageUrl) {
        this.formData.profilePicture = imageUrl;
        await this.companyService.editUserProfile(this.formData);
      } else {
        throw new Error('Failed to get download URL after upload.');
      }
    } catch (error:any) {
      console.error('Error uploading file:', error);
      this.toast.error('Failed to upload file. Please try again.');
    } 
      
  }
}



