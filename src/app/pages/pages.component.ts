import { Component, OnInit } from '@angular/core';
import { AuthService } from '../features/auth/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  /**
   * Logs out the user.
   *
   * This method calls the `logout` method of the `AuthService` class to log out the user.
   * If the logout is successful, it navigates to the root page using the `navigate` method of the `Router` class.
   * If the logout fails, an error message is logged to the console.
   *
   * @returns {void}
   */
  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }
}
