import { HttpInterceptorFn, HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Token } from '@angular/compiler';
import { CartService } from './cart.service';


export const headerInterceptor: HttpInterceptorFn = (req, next) => {
//   let token: any =  localStorage.getItem('userToken') ;

//   req = req.clone({
//     headers: req.headers.set('Authorization',`Bearer 
//     ${token}`),
//   });
  
  return next(req);
};
