import { Component, signal } from '@angular/core';
import { getAllProductInt, getAllProductResponseInt } from '../interface';
import { Links } from '../links';

@Component({
  imports: [],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
    constructor(public service: Links){
      this.getAllProduct(); //პროდუქტები
    }

    public products = signal<getAllProductInt[]>([]); //პროდუქტები

      getAllProduct() {
        this.service.getAllProductLink().subscribe({
          next: (data: getAllProductResponseInt) => this.products.set(data.products),
        });
      }
}
