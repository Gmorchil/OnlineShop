import { Component, computed, signal } from '@angular/core';
import { Links } from '../links';
import { CartProductInt, getCartInt } from '../interface';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  constructor(public service: Links) {
    this.getCart();
    this.showAllCarts();
  }
  allProducts = signal<any>([]);

  public carts = signal<CartProductInt[]>([]);

  showAllCarts() {
    this.service.getAllProductLink().subscribe((data: any) => {
      this.allProducts.set(data);
    });
  }

  cartList = signal<any>([]);

  getCart() {
    this.service.getCartLink().subscribe({
      next: (data: getCartInt) => {
        let busket: any = [];
        this.carts.set(data.products || []);
        this.updateCount();

        data.products.forEach((cartItem: any) => {
          this.allProducts().products.forEach((item: any) => {
            if (item._id == cartItem.productId) {
              item.quantity = cartItem.quantity;
              busket.push(item);
            }
          });
        });
        setTimeout(() => {
          this.cartList.set(busket);
        }, 500);
      },
      error: (err) => {
        console.error('კალათის წამოღება ვერ მოხერხდა', err);
      },
    });
  }

  count = computed(() => this.carts().length);

  //ჯამური ფასი

  totalPrice = computed(() =>
    this.carts().reduce((sum, item) => sum + item.quantity * item.pricePerQuantity, 0),
  );

  //წაშლა

  removeCart(id: string) {
    this.service.cartRemoveLink(id).subscribe({
      next: () => {
        this.carts.update((list) => list.filter((i) => i.productId !== id));
        this.updateCount();
      },
      error: (err) => console.error(err),
    });
  }

  private updateCount() {
    this.service.cartCount.set(this.carts().reduce((sum, item) => sum + item.quantity, 0));
  }
}
