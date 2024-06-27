import { Component, Inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLogin: boolean = false;
  cartNumber: number = 0;
  logOut() {
    this._authservice.logOut();
  }
  constructor(
    private _authservice: AuthService,
    @Inject(CartService) private _cartservice: CartService
  ) {
    _cartservice.numberOfCartItems.subscribe({
      next: (x) => {
        this.cartNumber = x;
      },
    });
  }
  ngOnInit() {
    this._authservice.userData.subscribe({
      next: () => {
        console.log(this._authservice.userData.getValue(), 'hellofromnavvv');
        if (this._authservice.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }
}
