import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers:[CartService]
})
export class CheckoutComponent {
  constructor(@Inject(CartService) private _cartService:CartService){}
  cartId:string=""
  
  shippingAddress:FormGroup = new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  });
navigateToPage(url:string) {

  window.location.href = url
  
}

  handleSubmit(shippingAddress:FormGroup){
    console.log(shippingAddress.value,this.cartId);
    this._cartService.onlinePayment(shippingAddress.value,"665422121d531b003414de1d").subscribe({
//cant link the cartId:string to the onlinePayment method^^^^^^
      next: (data:any) => {
        this.navigateToPage(data.session.url),
        console.log(data.session.url)},
      
      error: (err) => console.log(err)
      
    })      
    }

}
