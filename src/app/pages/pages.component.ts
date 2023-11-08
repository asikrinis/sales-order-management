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

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }
}
