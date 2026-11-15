import { Component, signal } from '@angular/core';
import { Links } from '../links';
import { getAllCategoriesInt, getAllProductInt, getAllProductResponseInt } from '../interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  imports: [RouterLink, CommonModule, FormsModule],
  selector: 'app-shop',
  styleUrl: './shop.css',
  templateUrl: './shop.html',
})
export class Shop {
  constructor(public service: Links) {
    this.getAllProduct(); //პროდუქტები
    this.getAllCategories(); //კატეგორიები
    this.getAllBrands(); //ბრენდები
    this.searching(); //ძებნა
  }

  public product = signal<getAllProductInt[]>([]); //პროდუქტები
  public categories = signal<getAllCategoriesInt[]>([]); //კატეგორიები
  public brands = signal<string[]>([]); // ბრენდები
  public active = signal<number>(0);
  public activeBrand = signal<string>('');

  getAllProduct() {
    this.active.set(0);
    this.activeBrand.set('');
    this.service.getAllProductLink().subscribe({
      next: (data: getAllProductResponseInt) => this.product.set(data.products),
      error: (err) => console.error(err),
    });
  }

  //კატეგორიები
  getAllCategories() {
    this.service.getAllCategoriesLink().subscribe({
      next: (data: getAllCategoriesInt[]) => this.categories.set(data),
      error: (err) => console.error(err),
    });
  }

  //ბრენდები
  getAllBrands() {
    this.service.getAllBrandsLink().subscribe({
      next: (res) => this.brands.set(res),
      error: (err) => console.error(err),
    });
  }

  //კატეგორიით გაფილტვრა

  changeCat(id: number) {
      this.active.set(id);

  if (id === 0) {
    this.getAllProduct();
    return;
  }
    this.service.changeCatLink(id).subscribe({
      next: (data: getAllProductResponseInt) => {
        this.product.set(data.products);
      },
    });
  }

  //ბრენდებით გაფილტვრა
  changeBrand(brand: string) {
    this.activeBrand.set(brand);

    if(!brand){
      this.getAllProduct()
      return
    }
    this.service.changeBrandLink(brand).subscribe({
      next: (data: getAllProductResponseInt) => {
        
        this.active.set(0);
        this.product.set(data.products);
      },
      error: (err) => console.error(err),
    });
  }
  //ძებნა

  inputText = signal<string>('');

  searching() {
    toObservable(this.inputText)
      .pipe(
        debounceTime(500),
        filter((text: string) => text != ""),
        distinctUntilChanged(),
        switchMap((text: string) => this.service.searchLink(text))
      )
   .subscribe({
        next: (data: getAllProductResponseInt) => this.product.set(data.products),
        error: (err: any) => console.error(err),
      });
  }
}
