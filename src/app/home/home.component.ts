import {  Component, Inject, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainsliderComponent } from '../mainslider/mainslider.component';
import { CategoriesComponent } from '../categories/categories.component';
import { SearchPipe } from '../search.pipe';
import { RatingModule } from 'primeng/rating';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    RouterModule,
    CarouselModule,
    MainsliderComponent,
    CarouselModule,
    CategoriesComponent,
    SearchPipe,
    RatingModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  Products: any[] = [];
  searchTerm: string = '';
  constructor(
    private _productsService: ProductsService,
   @Inject(CartService) private _cartservice: CartService,
    private _toaster: ToastrService
  ) {}
  addToCart(productId: string) {
    this._cartservice.addToCart(productId).subscribe({
      next: (response) => {
        this._cartservice.numberOfCartItems.next(response.numOfCartItems);
        console.log(response);
      },
      error: (err) => console.log(err),
    });
  }
  ngOnInit(): void {
    this._productsService.getProducts().subscribe({
      next: (response) => (this.Products = response.data),
      complete: () => console.log('complete from home '),
    });
  }
  showToastr(){
    this._toaster.success('Item Added', 'You have successfully added item to cart');
  }

  toNumber(text: string) {
    return parseInt(text);
  }
}
