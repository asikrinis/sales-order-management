import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/features/auth/core/interfaces/login-data.interfaces';
import { AuthService } from 'src/app/features/auth/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIcon(
      'google',
      domSanitizer.bypassSecurityTrustResourceUrl('../../assets/google-icon.svg')
    );
  }

  ngOnInit(): void {}

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/orders/order-list']))
      .catch((e) => console.log(e.message));
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/orders/order-list']))
      .catch((e) => console.log(e.message));
  }
}
