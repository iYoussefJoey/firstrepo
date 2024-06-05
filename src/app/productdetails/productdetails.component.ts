import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SeemorePipe } from '../seemore.pipe';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, SeemorePipe, RatingModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css',
  providers: [ProductsService],
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _productsService: ProductsService
  ) {}
  
  productid: any;
  productDeatils: any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      this.productid = params.get('id');
    });
    this._productsService.getProductsDeatils(this.productid).subscribe({
      next: (response) => (this.productDeatils = response.data),
      complete: () => console.log('completefromPD'),
    });
  }
  toNumber(text: string) {
    return parseInt(text);
  }
}
