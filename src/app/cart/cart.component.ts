import { Component, Inject, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CartService, ProductsService],
})
export class CartComponent implements OnInit {
  cartDetails: any = null;
  isLoading:boolean = false

  constructor(
    @Inject(CartService) private _cartservice: CartService,
    private _toaster: ToastrService
  ) {}
  removeitem(productId: string) {
    this._cartservice.removeCartItem(productId).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        this._toaster.success(
          'Item Removed',
          'You have successfully removed item from cart'
        );
        console.log(response);
      },
      error: (err) => console.log(err),
    });
  }

  updateItemCounter(productId: string, count: number) {
    this._cartservice.updateItemCount(productId, count).subscribe({
      next: (response) => {
        this._toaster.success(
          'Item Updated',
          'You have successfully updated item count'
        );
        this.cartDetails = response.data;
        console.log(response.data);
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void {
    this._cartservice.getLoggeduserCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        console.log(response, 'from cart');
      },
      error: (err) => console.log(err),
    });
  }
}
