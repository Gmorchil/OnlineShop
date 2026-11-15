import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { signInInt } from '../interface';
import { form, required, FormField } from '@angular/forms/signals';
import { Links } from '../links';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth';

@Component({
  imports: [RouterLink, FormField],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private router = inject(Router);
  private auth = inject(AuthService);

  constructor(public service: Links) {}

  public signIn = signal<signInInt>({
    email: '',
    password: '',
  });

  public errorMessage = signal('');
  public signInmethod = form(this.signIn, (field) => {
    required(field.email, { message: 'Enter Email' });
    required(field.password, { message: 'Enter Password' });
  });

  logIn(e: Event) {
    e.preventDefault();

    if (this.signInmethod().invalid()) {
      return;
    }

    this.errorMessage.set('');
    this.service.signInLink(this.signInmethod().value()).subscribe({
      next: (res: any) => {
        this.auth.login(res.access_token);
        this.router.navigate(['/profile']);
      },
      error: (err: HttpErrorResponse) =>
        this.errorMessage.set(
          err.status === 401 || err.status === 400
            ? 'Wrong email or password'
            : 'Something went wrong. Please try again.',
        ),
    });
  }
}