import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Shop } from './shop/shop';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Cart } from './cart/cart';
import { Polity } from './polity/polity';
import { Signup } from './signup/signup';
import { Changepass } from './changepass/changepass';
import { Profile } from './profile/profile';
import { Details } from './details/details';
import { guardGuard } from './guard-guard';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'about', component: About, title: 'About' },
  { path: 'shop', component: Shop, title: 'Product' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: 'logIn', component: Login, title: 'Log In' },
  { path: 'cart', component: Cart, title: 'Cart', canActivate: [guardGuard] },
  { path: 'policy', component: Polity, title: 'Policy' },
  { path: 'signIn', component: Signup, title: 'Sign In' },
  { path: 'forget', component: Changepass, title: 'Change Password' },
  { path: 'profile', component: Profile, title: 'Profile' },
  { path: 'details/:id', component: Details, title: 'Details' },
  { path: 'changepass', component: Changepass, title: 'Change Password' },
];
