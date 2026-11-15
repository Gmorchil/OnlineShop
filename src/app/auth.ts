import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = signal<string | null>(localStorage.getItem('token'));

  isLoggedIn = computed(() => !!this.token());

  login(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }

    getToken() {
    return this.token();
  }
}