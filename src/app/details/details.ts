import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  getAllProductInt,
  getAllProductResponseInt,
  rateProdInt,
} from '../interface';
import { Links } from '../links';
import { CommonModule, DecimalPipe } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  imports: [RouterLink, DecimalPipe, CommonModule],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export class Details{
  constructor(
    public service: Links,
    public route: ActivatedRoute,     
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params: any) => {
      let id = params.get('id');
      if (!id) return;
      this.getProductDetails(id);
      this.randomProduct();
    });
  }

  public details = signal<getAllProductInt | null>(null);
  public images = computed(() => this.details()?.images ?? []);
  public currentIndex = signal(0);
  public currentImage = computed(() => this.images()[this.currentIndex()]);
  public randProd = signal<getAllProductInt[]>([]);
  public hoverRating = signal(0);

  // კალათა
  public cartMessage = signal<string | null>(null);
  public isAdding = signal(false);

  // შეფასება
  public selectedRating = signal(0);
  public isRating = signal(false);
  public rateMessage = signal<string | null>(null);
  public stars = [1, 2, 3, 4, 5];

  getProductDetails(id: string) {
    this.service.detailLink(id).subscribe({
      next: (data: getAllProductInt) => {
        this.details.set(data);
        this.currentIndex.set(0);
        this.selectedRating.set(0);
        this.rateMessage.set(null);
        this.cartMessage.set(null);
      },
      error: (err) => console.error(err),
    });
  }

  next() {
    let total = this.images().length;
    if (!total) return;
    this.currentIndex.update((i) => (i + 1) % total);
  }

  preview() {
    let total = this.images().length;
    if (!total) return;
    this.currentIndex.update((i) => (i - 1 + total) % total);
  }

  randomProduct(count = 5) {
    this.service.getAllProductLink().subscribe({
      next: (data: getAllProductResponseInt) => {
        const shuffled = [...data.products].sort(() => Math.random() - 0.5);
        this.randProd.set(shuffled.slice(0, count));
      },
      error: (err) => console.error(err),
    });
  }

  // კალათაში დამატება
  addToCart(id: string) {
    this.service
      .profileLink()
      .pipe(
        switchMap((profile: any) => profile.cartID ? this.service.getCartLink().pipe(
            switchMap((cart: any) => {
              const found = cart.products.find((p: any) => p.productId == id);
              const payload = { id, quantity: found ? found.quantity + 1 : 1 };

              return profile.cartID
                ? this.service.updateCartLink(payload)
                : this.service.addToCartLink(payload);
            }),
          ): this.service.addToCartLink({ id, quantity:  1 })
        
        ),
      )
      .subscribe({
        next: (res: any) => this.service.cartCount.set(res.total.products),
        error: (err) => console.error(err),
      });
  }

  // შეფასება
  isStarActive(star: number): boolean {
    const value = this.hoverRating() || this.selectedRating();
    return star <= value;
  }

  rate(star: number) {
    const product = this.details();
    if (!product || this.isRating()) return;

    const info: rateProdInt = {
      productId: product._id,
      rate: star,
    };

    this.isRating.set(true);
    this.rateMessage.set(null);

    this.service.rateProdLink(info).subscribe({
      next: () => {
        this.selectedRating.set(star);
        this.rateMessage.set('შეფასება წარმატებით გაიგზავნა!');
        this.isRating.set(false);
        this.getProductDetails(product._id);
      },
      error: (err) => {
        this.rateMessage.set(
          err.status === 401 ? 'შეფასებისთვის გაიარეთ ავტორიზაცია' : 'შეფასება ვერ გაიგზავნა',
        );
        this.isRating.set(false);
      },
    });
  }
}
