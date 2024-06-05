import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _Httpclient: HttpClient) {}
    getProducts():Observable<any>
    {
      return this._Httpclient.get('https://route-ecommerce.onrender.com/api/v1/products')
    }
    getProductsDeatils(id:string):Observable<any>
    {
          return this._Httpclient.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    }

    getcategories():Observable<any>
    {
      return this._Httpclient.get('https://route-ecommerce.onrender.com/api/v1/categories')
    }
   }

