import { Component, signal } from '@angular/core';
import { Links } from '../links';
import { count } from 'rxjs';
import { RouterLink } from '@angular/router';
import { getAllProductInt, getAllProductResponseInt } from '../interface';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  constructor(public service: Links){
      this.randomProduct();
      this.revprod1()
      this.revprod2()
      this.revprod3()
      this.revprod4()
      this.revprod5()
  }
public randProd = signal<getAllProductInt[]>([]);
public rev1 = signal<getAllProductInt[]>([]);
public rev2 = signal<getAllProductInt[]>([]);
public rev3 = signal<getAllProductInt[]>([]);
public rev4 = signal<getAllProductInt[]>([]);
public rev5 = signal<getAllProductInt[]>([]);

    randomProduct(count = 5) {
      this.service.getAllProductLink().subscribe({
        next: (data: getAllProductResponseInt) => {
          const shuffled = [...data.products].sort(() => Math.random() - 0.5);
          this.randProd.set(shuffled.slice(0, count));
        },
        error: (err) => console.error(err),
      });
    }


        revprod1(count = 1) {
      this.service.getAllProductLink().subscribe({
        next: (data: getAllProductResponseInt) => {
          const shuffled = [...data.products].sort(() => Math.random() - 0.1);
          this.rev1.set(shuffled.slice(0, count));
        },
        error: (err) => console.error(err),
      });
    }
        revprod2(count = 1) {
      this.service.getAllProductLink().subscribe({
        next: (data: getAllProductResponseInt) => {
          const shuffled = [...data.products].sort(() => Math.random() - 0.1);
          this.rev2.set(shuffled.slice(0, count));
        },
        error: (err) => console.error(err),
      });
    }
        revprod3(count = 1) {
      this.service.getAllProductLink().subscribe({
        next: (data: getAllProductResponseInt) => {
          const shuffled = [...data.products].sort(() => Math.random() - 0.1);
          this.rev3.set(shuffled.slice(0, count));
        },
        error: (err) => console.error(err),
      });
    }
        revprod4(count = 1) {
      this.service.getAllProductLink().subscribe({
        next: (data: getAllProductResponseInt) => {
          const shuffled = [...data.products].sort(() => Math.random() - 0.1);
          this.rev4.set(shuffled.slice(0, count));
        },
        error: (err) => console.error(err),
      });
    }
        revprod5(count = 1) {
      this.service.getAllProductLink().subscribe({
        next: (data: getAllProductResponseInt) => {
          const shuffled = [...data.products].sort(() => Math.random() - 0.1);
          this.rev5.set(shuffled.slice(0, count));
        },
        error: (err) => console.error(err),
      });
    }
}
