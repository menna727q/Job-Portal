import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { iuser } from '../../../Models/iuser';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../../services/user.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-signincompany',
  templateUrl: './signincompany.component.html',
  styleUrl: './signincompany.component.css'
})
export class SignincompanyComponent implements OnInit {
  imageSource : string = './../../assets/images/Frame 3.png'
  frameOf :string='./../../assets/images/Ribbon-3.png'

  ngOnInit(): void {
   
  }

 
    showPassword: boolean = false;

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
    SigninCompanyForm : FormGroup;
    

    constructor(public authService:AuthService, private fb:FormBuilder,private http: HttpClient,private router: Router,private route: ActivatedRoute){
      this.SigninCompanyForm=fb.group({
        email:["",[Validators.required,Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
        password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
      });
  
     
    }
    eyeIcon = 'pi pi-eye';
    eyeSlashIcon = 'pi pi-eye-slash';
    
    get email(){
      return this.SigninCompanyForm.get('email');
  }
  get password(){
    return this.SigninCompanyForm.get('password');
}

submitSigninForm() {
  let userModel:iuser=this.SigninCompanyForm.value as iuser;
  console.log(userModel.email)  
  this.authService.login(true,userModel.email, userModel.password)
  
  }
}
