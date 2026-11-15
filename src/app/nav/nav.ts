import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth';
import { Links } from '../links';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  auth = inject(AuthService);
  service = inject(Links);
  menuOpen = false;

  constructor() {
    this.service.getCartLink().subscribe({
      next: (data) => {
        const total = (data.products ?? []).reduce((sum, item) => sum + item.quantity, 0);
        this.service.cartCount.set(total);
      },
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}