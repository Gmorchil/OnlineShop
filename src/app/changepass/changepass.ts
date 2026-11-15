import { Component, inject, signal } from '@angular/core';
import { form, FormField, minLength, pattern, required } from '@angular/forms/signals';
import { Links } from '../links';
import { changePassInt, registInt, updateDetailsInt } from '../interface';

@Component({
  selector: 'app-changepass',
  imports: [FormField],
  styleUrl: './changepass.css',
  templateUrl: './changepass.html',
})
export class Changepass {
  private service = inject(Links);
  constructor() {
    this.getUserData();
  }

  successMessage = signal('');
  detsuccessMessage = signal('');
  errorMessage = signal('');
  deterrorMessage = signal('');
  loading = signal(false);

  changePass = signal<changePassInt>({
    oldPassword: '',
    newPassword: '',
  });

  changeForm = form(this.changePass, (field) => {
    required(field.oldPassword, { message: 'Please fill old password!' });
    required(field.newPassword, { message: 'Please fill new password!' });
    pattern(
      field.newPassword,
      /^[A-Z](?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,19}$/,
      {
        message:
          'Required: first letter capital, one symbol, one number, minimum 8 and maximum 20 characters',
      },
    );
  });

  change() {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.changeForm().invalid()) {
      this.errorMessage.set('Please fill in both fields correctly');
      return;
    }

    this.loading.set(true);

    this.service.changePassLink(this.changePass()).subscribe({
      next: () => {
        this.successMessage.set('Password changed');
        this.changePass.set({ oldPassword: '', newPassword: '' });
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.error || 'Password change failed');
        this.loading.set(false);
      },
    });
  }
  //მონაცემების შეცვლა
  public userData = signal({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    phone: '',
    zipcode: '',
    avatar: '',
    gender: '',
  });

  signalForm = form(this.userData, (field) => {
    (required(field.firstName, { message: 'Please Fill First Name!' }),
      required(field.lastName, { message: 'Please Fill Last Name!' }),
      required(field.age, { message: 'Please Fill Age!' }),
      required(field.address, { message: 'Please Fill Address!' }),
      required(field.phone, { message: 'Please fill phone number' }),
      pattern(field.phone, /^\+995\d{9}$/, {
        message: 'Phone must start with +995 followed by 9 digits',
      }),
      required(field.avatar, { message: 'Please Upload Avatar!' }),
      required(field.gender, { message: 'Please Fill Gender!' }),
      minLength(field.firstName, 2, { message: 'Minimum 2 Letter!' }),
      minLength(field.lastName, 4, { message: 'Minimum 4 Letter!' }),
      pattern(field.firstName, /^[A-Z]/, { message: 'Please Start with Capital' }));
    pattern(field.lastName, /^[A-Z]/, { message: 'Please Start with Capital' });
  });
  public profiledata = signal<registInt | null>(null);

  getUserData() {
    this.service.profileLink().subscribe({
      next: (res: registInt) => {
        this.userData.set({
          firstName: res.firstName,
          lastName: res.lastName,
          age: res.age,
          address: res.address,
          phone: res.phone,
          zipcode: res.zipcode,
          avatar: res.avatar,
          gender: res.gender,
        });
        this.profiledata.set(res);
      },
      error: (err) => console.log(err),
    });
  }

  updateUser(e: Event) {
    e.preventDefault();
    this.service.updateUserLink(this.signalForm().value()).subscribe({
      next: (data) => {
        this.detsuccessMessage.set('Details changed');
      },
      error: (err) => {
        this.deterrorMessage.set(err.error?.error || 'Details change failed');
      },
    });
  }
}
