import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { iuser } from '../../../Models/iuser';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  
  imageSource : string = './../../assets/images/Frame 3.png'
  frameOf :string='./../../assets/images/Ribbon-3.png'

  activeSign: string | null = 'signIn'; // To track the active sign-in type
  ngOnInit(): void {
    
  }
    showPassword: boolean = false;

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
    SigninForm : FormGroup;
    
    constructor(public authService:AuthService, private fb:FormBuilder,private http: HttpClient,private router: Router,private route: ActivatedRoute){
     //holds values of inputes in form
     //Initializes the SigninForm FormGroup using the FormBuilder service (fb).
      //The FormGroup contains two form controls: email and password.
      this.SigninForm=fb.group({
        email:["",[Validators.required,Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
        password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
      });
  
     
    }
    eyeIcon = 'pi pi-eye';
    eyeSlashIcon = 'pi pi-eye-slash';
    
    get email(){
      return this.SigninForm.get('email');
  }
  get password(){
    return this.SigninForm.get('password');
}

submitSigninForm() {
  //It extracts the form values (email and password) from the SigninForm and assigns them to a user model (userModel).
  let userModel:iuser=this.SigninForm.value as iuser;
  // console.log(userModel.email)
  this.authService.login(false , userModel.email, userModel.password)
 
  
  }

}
