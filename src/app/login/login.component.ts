import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService],
})
export class LoginComponent {
  constructor(private _authservice: AuthService, private _router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this._router.navigate(['/home']);
    } else {
      this._router.navigate(['/login']);
    }
  }

  apiError: string = '';
  isLoading: boolean = false;
  checked: boolean = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
    ]),
  });

  logInForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    rePassword: new FormControl(null),
    phone: new FormControl(null),
  });
  handleLogin(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid)
      this._authservice.signin(loginForm.value).subscribe({
        next: (data) => {
          if (data.message === 'success') {
            localStorage.setItem('userToken', data.token);
            this._authservice.decodeUserData();
            this.isLoading = false;
            this._router.navigate(['/home']).then(() => {
              window.location.reload();
            })
            this._authservice.userData.next(data.user);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          this.apiError = err.error.message;
        },

        complete: () => console.log('complete from login'),
      });
  }
}
