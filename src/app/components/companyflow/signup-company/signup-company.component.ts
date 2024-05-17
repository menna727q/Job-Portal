import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iuser } from '../../../Models/iuser';
import { validate } from 'uuid';
@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrl: './signup-company.component.css'
})
export class SignupCompanyComponent  implements OnInit{
  imageSource : string = './../../assets/images/Frame 3.png'
  userFrame:string='./../../assets/images/user2.png'
  SignupCompanyForm: FormGroup;
  constructor(public authService:AuthService, private fb:FormBuilder,private http: HttpClient,private router: Router,private route: ActivatedRoute){
    this.SignupCompanyForm = fb.group({
      name: ['', Validators.required],
      emailsignup: ['', [Validators.required,Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
      phoneNumber: ['', Validators.required],
      password_signup: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      city:['',[Validators.required]],
      area:['',[Validators.required]],
      industry:['',[Validators.required]],
      website:['', Validators.required],
      description:['']
    });
   
  }
  get name() {
    return this.SignupCompanyForm.get('name');
  }
  get password_signup() {
    return this.SignupCompanyForm.get('password_signup');
  }
  get city() {
    return this.SignupCompanyForm.get('city');
  }
  
  get area() {
    return this.SignupCompanyForm.get('area');
  }
  
  get emailsignup() {
    return this.SignupCompanyForm.get('emailsignup');
  }
  
  get phoneNumber() {
    return this.SignupCompanyForm.get('phoneNumber');
  }
  get industry() {
    return this.SignupCompanyForm.get('industry');
  }
  get webstie() {
    return this.SignupCompanyForm.get('webstie');
  }
  get description() {
    return this.SignupCompanyForm.get('description');
  }
  
  async submitSignupForm() {
    let userModel:iuser=this.SignupCompanyForm.value as iuser;
    console.log(userModel)
    await this.authService.companySignUp(userModel);
  }
  navigateToSignin(): void {
    this.router.navigate(['/signin'], { queryParams: { signup: 'true' } });
  }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  selectResume(): void {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  handleFolderUpload(event: any): void {
    const files = event.target.files;

    // Process the selected folder
    if (files && files.length > 0) {
      const folder = files[0];
      console.log('Selected folder:', folder);
      // Perform further processing or upload the folder
    }
  }
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  eyeIcon = 'pi pi-eye';
  eyeSlashIcon = 'pi pi-eye-slash';
  
ngOnInit(): void {
    
}
}
