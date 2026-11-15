import { Component, signal } from '@angular/core';
import { email, form, FormField, minLength, pattern, required } from '@angular/forms/signals';
import { min } from 'rxjs';
import { __metadata } from 'tslib';
import { Links } from '../links';
import { CookieService } from 'ngx-cookie-service';

@Component({
  imports: [FormField],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup {
  constructor(
    public service: Links,
    private cookie: CookieService,
  ) {}

  public successMessage = signal('');
  public errorMessage = signal('');

  public regData = signal({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    zipcode: '',
    avatar: '',
    gender: '',
  });

  public regForm = form(this.regData, (field) => {
    (required(field.firstName, { message: 'Please Fill First Name!' }),
      required(field.lastName, { message: 'Please Fill Last Name!' }),
      required(field.age, { message: 'Please Fill Age!' }),
      required(field.email, { message: 'Please Fill Email Address!' }),
      required(field.password, { message: 'Please Fill Password!' }),
      required(field.address, { message: 'Please Fill Address!' }),
  required(field.phone, { message: 'Please fill phone number' }),
  pattern(field.phone, /^\+995\d{9}$/, {
    message: 'Phone must start with +995 followed by 9 digits'}),
      required(field.avatar, { message: 'Please Upload Avatar!' }),
      required(field.gender, { message: 'Please Fill Gender!' }),
      minLength(field.firstName, 2, { message: 'Minimum 2 Letter!' }),
      minLength(field.lastName, 4, { message: 'Minimum 4 Letter!' }),
      email(field.email, { message: 'Use Valid Email!' }),
      pattern(field.firstName, /^[A-Z]/, { message: 'Please Start with Capital' }));
    pattern(field.lastName, /^[A-Z]/, { message: 'Please Start with Capital' });
    pattern(field.password, /^[A-Z](?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,19}$/, {
      message: 'Required: First Capital, One Symbol, One Number, Minimum 6 Maximum 20 letters',
    });
  });

  confirm(e: Event) {
    e.preventDefault();
    this.service.registLink(this.regForm().value()).subscribe({
      next: (res: any) => {
        this.successMessage.set('Registered Successfully, Please Check Email');
        this.cookie.set('user', res.access_token);
      },
      error: (err) => this.errorMessage.set('Registration Failed'),
    });
  }
}
