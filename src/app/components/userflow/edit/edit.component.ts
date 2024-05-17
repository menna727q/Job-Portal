import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../Models/user';
import { iuser } from '../../../Models/iuser';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs/operators';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  userFrame: string = './../../assets/images/user2.png';

 
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  selectResume(): void {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

//  async handleFileUpload(event: any) {
//     const file = event.target.files[0];
  
//     // Process the selected file
//     if (file) {
//       console.log('Selected file:', file);
//       const path=`${file.name}`;
//       const uploadFile= await this.fireStorage.upload(path,file);
//       const url=await uploadFile.ref.getDownloadURL();
//       // Perform further processing or upload the file
//     }
//   }
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  eyeIcon = 'pi pi-eye';
  eyeSlashIcon = 'pi pi-eye-slash';
  userData:any;
  formData={
    email:'',
    phoneNumber:'',
    password:'',
    jobTitle:'',
    education:'',
    resume:'',
    overview:'',
    profilePicture:''
  }
  constructor(public userService: UserService,private toast: HotToastService,public fireStorage:AngularFireStorageModule) {}
  async ngOnInit(): Promise<void> {
    this.userData =  await this.userService.getUserInfo();
    // this.userData = this.userService.getUserInfo();
    // // Initialize formData with userData
    this.formData = { ...this.userData };
  }
 
  async editProfile(event: any) {
    console.log(this.formData)
    await this.userService.editUserProfile(this.formData);
    console.log(this.formData.profilePicture)
    if (this.userData.profilePicture !== this.formData.profilePicture) {
      // If the profile picture has changed, update it in the user's database record
      this.userData.profilePicture = this.formData.profilePicture;
      this.userService.uploadImage(this.userData.user_id, this.formData.profilePicture)
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
    // const filePath =   file.name; // Set the file path in Firebase Storage

    if (!file) {
        return; // No file selected
    }
      // this.userService.uploadImage(file, `${this.userData.user_id}`)
   
    try {
      // const downloadURL = await this.userService.uploadImage(file, filePath).toPromise();
      const imageUrl = await this.userService.uploadImage(file, `${this.userData.user_id}`).toPromise()
      if (imageUrl) {
        this.formData.profilePicture = imageUrl;
        await this.userService.editUserProfile(this.formData);
      } else {
        throw new Error('Failed to get download URL after upload.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      this.toast.error('Failed to upload file. Please try again.');
    } 
      
}
async handleFileUpload(event: any): Promise<void> {
  const file: File = event.target.files[0]; // Get the selected file
  const filePath =   file.name; // Set the file path in Firebase Storage

  // Upload the file to Firebase Storage
  try {
    const downloadURL = await this.userService.uploadImage(file, filePath).toPromise();
    if (downloadURL) {
      // Update the user's information with the file URL
      this.formData.resume = downloadURL;
      // Update the user's information in the database
      await this.userService.editUserProfile(this.formData);
      // this.toast.success('File uploaded successfully.');
    } else {
      throw new Error('Failed to get download URL after upload.');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    this.toast.error('Failed to upload file. Please try again.');
  } 
}



}
