import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import {
  addToCartInt,
  changePassInt,
  getAllBrandsInt,
  getAllCategoriesInt,
  getAllProductInt,
  getAllProductResponseInt,
  getCartInt,
  rateProdInt,
  registInt,
  signInInt,
  updateDetailsInt,
} from './interface';
import { AuthService } from './auth';
import { BehaviorSubject } from 'rxjs';
import { Token } from '@angular/compiler';

@Service()
export class Links {
  public http = inject(HttpClient);
  public auth = inject(AuthService);

  loadingTruck: BehaviorSubject<boolean> = new BehaviorSubject(false);

  cartCount = signal(0)

  getAllProductLink() {
    return this.http.get<getAllProductResponseInt>(
      'https://api.everrest.educata.dev/shop/products/all?page_size=50',
    );
  }

  getAllCategoriesLink() {
    return this.http.get<getAllCategoriesInt[]>(
      'https://api.everrest.educata.dev/shop/products/categories',
    );
  }

  getAllBrandsLink() {
    return this.http.get<string[]>('https://api.everrest.educata.dev/shop/products/brands');
  }

  registLink(body: registInt) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_up', body);
  }

  signInLink(body: signInInt) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_in', body);
  }

  profileLink() {
    return this.http.get<registInt>('https://api.everrest.educata.dev/auth', {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }

  //პაროლის შეცვლა

  changePassLink(info: changePassInt) {
    const raw = this.auth.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${raw}`,
    });

    return this.http.patch('https://api.everrest.educata.dev/auth/change_password', info, {
      headers,
    });
  }

  //პროფილის განახლება

  updateUserLink(body: updateDetailsInt) {
    const raw = this.auth.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${raw}`,
    });
    return this.http.patch('https://api.everrest.educata.dev/auth/update', body, { headers });
  }

  //ფილტრაცია კატეგორიებით
  changeCatLink(id: number) {
    return this.http.get<getAllProductResponseInt>(
      `https://api.everrest.educata.dev/shop/products/category/${id}?page_size=50`,
    );
  }

  //ფილტრაცია ბრენდებით
  changeBrandLink(brand: string) {
    return this.http.get<getAllProductResponseInt>(
      `https://api.everrest.educata.dev/shop/products/brand/${brand}`,
    );
  }

  //ძებნის ფუნქცია
  searchLink(text: string) {
    return this.http.get<getAllProductResponseInt>(
      `https://api.everrest.educata.dev/shop/products/search?page_index=1&page_size=50&keywords=${text}`,
    );
  }

  //დეტალური გვერდი
  detailLink(id: string) {
    return this.http.get<getAllProductInt>(
      `https://api.everrest.educata.dev/shop/products/id/${id}`,
    );
  }

  //Sign Out
  signOutLink() {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_out', {});
  }

  //კალათაში დამატება
private authHeaders() {
  const token = this.auth.getToken();
  return token
    ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
    : {};
}

getCartLink() {
  return this.http.get<getCartInt>(
    'https://api.everrest.educata.dev/shop/cart',
    this.authHeaders()
  );
}

addToCartLink(info: addToCartInt) {
  return this.http.post(
    'https://api.everrest.educata.dev/shop/cart/product',
    info,
    this.authHeaders()
  );
}

updateCartLink(info: addToCartInt) {
  return this.http.patch(
    'https://api.everrest.educata.dev/shop/cart/product',
    info,
    this.authHeaders()
  );
}

  //შეფასება
rateProdLink(info: rateProdInt){
      const raw = this.auth.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${raw}`,
    });
  return this.http.post<rateProdInt>("https://api.everrest.educata.dev/shop/products/rate", info,
    {headers}
  )
}

cartRemoveLink(id: string) {
  const token = this.auth.getToken();
  return this.http.delete(
    'https://api.everrest.educata.dev/shop/cart/product',
    {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      body: { id }
    }
  );
}


}


