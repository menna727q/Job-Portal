import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { iuser } from '../../../Models/iuser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  imageSource: string = './../../assets/images/Frame 3.png';
  userFrame: string = './../../assets/images/user2.png';
  SignupForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      emailsignup: [
        '',
        [Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]
      ],
      phoneNumber: ['', Validators.required],
      password_signup: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      ],
      jobTitle: ['', Validators.required],
      overview: [''],
      education: [''],
      resume: ['']
    });
  }

  get firstName() {
    return this.SignupForm.get('firstName');
  }

  get lastName() {
    return this.SignupForm.get('lastName');
  }

  get gender() {
    return this.SignupForm.get('gender');
  }

  get emailsignup() {
    return this.SignupForm.get('emailsignup');
  }

  get phoneNumber() {
    return this.SignupForm.get('phoneNumber');
  }

  get password_signup() {
    return this.SignupForm.get('password_signup');
  }

  get jobTitle() {
    return this.SignupForm.get('jobTitle');
  }

  get education() {
    return this.SignupForm.get('education');
  }

  get overview() {
    return this.SignupForm.get('overview');
  }

  get resume() {
    return this.SignupForm.get('resume');
  }

  async submitSignupForm() {
    let userModel = this.SignupForm.value as iuser;
    await this.authService.signUp(userModel);
    console.log(userModel);

  }

  navigateToSignin(): void {
    this.router.navigate(['/user/signin'], { queryParams: { signup: 'true' } });
  }
//{ static: false } indicates that the query should be resolved at runtime rather than at compile time.
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  selectResume(): void {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  handleFileUpload(event: any): void {
    const file = event.target.files[0];
    const filePath = file.name;
  
    this.userService.uploadImage(file, filePath).subscribe(
      downloadURL => {
        console.log('Resume uploaded successfully. Download URL:', downloadURL);
        if (downloadURL) {
          this.SignupForm.patchValue({ resume: downloadURL });
           this.authService.signUp(this.SignupForm.value);

          console.log('Resume field updated:', this.SignupForm.value.resume);
        }
      },
      error => {
        console.error('Error uploading resume:', error);
        // Handle error if needed
      }
    );
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  eyeIcon = 'pi pi-eye';
  eyeSlashIcon = 'pi pi-eye-slash';
}