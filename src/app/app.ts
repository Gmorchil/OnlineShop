import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { Footer } from './footer/footer';
import { Links } from './links';

@Component({
  imports: [RouterOutlet, Nav, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('onlineshop');
  constructor(public service: Links) {
    this.getLoadingData();
  }

  public loading = signal<boolean>(false);

  getLoadingData() {
    this.service.loadingTruck.subscribe((data: boolean) => this.loading.set(data));
  }
}
