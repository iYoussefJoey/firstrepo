import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  numberOfCartItems = new BehaviorSubject(0);
  constructor(private _httpclient: HttpClient) {
    this.getLoggeduserCart().subscribe({
      next: (response) => {
        this.numberOfCartItems.next(response.numOfCartItems);
        console.log(response);
      },
      error: (err) => console.log(err),
    });
  }

  headers: any = {
    token: localStorage.getItem('userToken'),
  }
  addToCart(productId: string): Observable<any> {
    return this._httpclient.post(
      'https://route-ecommerce.onrender.com/api/v1/cart',
      { productId: productId },
      { headers: this.headers }
    );
  }
  getLoggeduserCart(): Observable<any> {
    return this._httpclient.get(
      'https://route-ecommerce.onrender.com/api/v1/cart',
      { headers: this.headers }
    );
  }
  removeCartItem(productId: string): Observable<any> {
    return this._httpclient.delete(
      `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      { headers: this.headers }
    );
  }
  updateItemCount(productId: string, count: number): Observable<any> {
    return this._httpclient.put(
      `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      {
        count: count,
      },
      { headers: this.headers }
    );
  }
  onlinePayment(shippingAddress: any , cartId: string) {
    return this._httpclient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shippingAddress },
      { headers: this.headers }
    );
  }
  
}
