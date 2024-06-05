import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    {path:'',redirectTo:'login', pathMatch:'full'},
    {path:'home',canActivate:[authGuard],component:HomeComponent},
    {path:'about',canActivate:[authGuard],component:AboutComponent},
    {path:'brands',canActivate:[authGuard],component:BrandsComponent},
    {path:'products',canActivate:[authGuard],component:ProductsComponent},
    {path:'carts',canActivate:[authGuard],component:CartComponent},
    {path:'checkout',canActivate:[authGuard],component:CheckoutComponent},
    {path:'categories',canActivate:[authGuard],component:CategoriesComponent},
    {path:'productsdetails/:id',canActivate:[authGuard],component:ProductdetailsComponent},
    {path:'allorders',canActivate:[authGuard],component:HomeComponent},
    {path:'settings',canActivate:[authGuard],
    loadComponent:() =>  import('./changepw/changepw.component').then(c => c.ChangepwComponent),
    canDeactivate: [authGuard]},
    {path:'login',component:LoginComponent},
    {path:'register',component:SignupComponent},
    {path:'**',component:NotfoundComponent},
 
];

