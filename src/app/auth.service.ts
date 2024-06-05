import { DOCUMENT } from '@angular/common';
import { HttpClient,  } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject(null);
  
  constructor(private _HttpClient: HttpClient, private _router: Router , @Inject(DOCUMENT) private document:Document) {
    
    setTimeout(()=>{
      this.logOut()
    },6000000)

    if(localStorage.getItem('userToken')!==null)
      { this.decodeUserData()}
  
  }
  decodeUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken);
    console.log(decodedToken,'hellofrom AUTH');
    this.userData.next(decodedToken);
  }
  
  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/login']);
  }

  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }
  signin(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }
}
