import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule ,Validators,} from '@angular/forms';
import {  ToggleButtonModule } from 'primeng/togglebutton';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ToggleButtonModule,FormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers:[AuthService]
})
export class SignupComponent {
  constructor(private _authservice:AuthService,private _router:Router)
  {

    if(localStorage.getItem('userToken')!==null)
      { this._router.navigate(['/home'])}
      else
      {this._router.navigate(['/register'])}
  }
  apiError:string = '';
  isLoading:boolean = false;
  checked:boolean = true
  registerform:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(12)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')]),
    rePassword:new FormControl(null,[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:this.rePasswordMatch})
rePasswordMatch(registerform:any){
let passwordControl = registerform.get('password');
let confirmPasswordControl = registerform.get('rePassword');
if(passwordControl.value === confirmPasswordControl.value)
  {return null;}
else{
  confirmPasswordControl.setErrors({PasswordMatch:'Password and Confirm Password does not match'});
  { return {PasswordMatch:' Password does not match , Please check both passwords are the same'}
  }
}
}

  logInForm:FormGroup = new FormGroup({
    name:new FormControl(null),
    email:new FormControl(null),
    password:new FormControl(null),
    rePassword:new FormControl(null),
    phone:new FormControl(null),
  })
  handleRegister(registerform:FormGroup)
  {
    this.isLoading = true
  if(registerform.valid) 
    // console.log(registerform.value)
    //register method
    this._authservice.register(registerform.value).subscribe({
      // routerlink to login
      
      next: (data) =>{if(data.message==="success") 
        this.isLoading = false
        this._router.navigate(['/home']);},
      error: (err) =>{ this.isLoading = false;
        console.log(err)
        this.apiError = err.error.message;
      },
      
      complete: () => console.log('completefromsignup')
        
      }
    )
  }
  }


