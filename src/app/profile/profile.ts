import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Links } from '../links';
import { registInt } from '../interface';
import { AuthService } from '../auth';

@Component({
  imports: [],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  constructor(
    public service: Links,
    private auth: AuthService,
    private router: Router
  ) {
    this.getProfile();
  }

  public profile = signal<registInt | null>(null);

  getProfile() {
    this.service.profileLink().subscribe({
      next: (res) => this.profile.set(res),
      error: (err) => console.log(err),
    });
  }

  signOut() {
    this.service.signOutLink().subscribe({
      next: () => this.finishLogout(),
      error: () => this.finishLogout(),
    });
  }

  private finishLogout() {
    this.auth.logout();
    this.profile.set(null);
    this.router.navigate(['/logIn']);
  }

//პაროლის შეცვლაზე გადასვლა
    goToChangePass() {
    this.router.navigate(['/changepass']);
  }
  
}