import {Injectable, Inject} from '@angular/core';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';

import { AuthConfigurationInterface } from '../models/auth-config.interface';
import { AUTH_CONFIG } from '../models/auth-config';

// why do you need defining window as any?
// check this: https://github.com/aws/aws-amplify/issues/678#issuecomment-389106098
(window as any).global = window;

@Injectable()
export class AuthService {
  private readonly appRootUrl = 'http://localhost:3100/';
  private readonly auth0: auth0.WebAuth;

  accessToken: string;
  expiresAt: number;

  constructor(public router: Router, @Inject(AUTH_CONFIG) private readonly config: AuthConfigurationInterface) {
    this.auth0 = new auth0.WebAuth({
      clientID: config.oAuth2Config.clientId,
      domain: config.oAuth2Config.clientDomain,
      responseType: 'token id_token',
      redirectUri: this.appRootUrl,
      scope: 'openid profile email',
      audience: config.oAuth2Config.audience
    });
  }

  login(): void {
    this.auth0.authorize();
  }

  handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.accessToken = authResult.accessToken;
        this.expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.router.navigate(['/dashboard']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  logout(): void {
    this.accessToken = null;
    this.expiresAt = null;

    this.auth0.logout({
      returnTo: this.appRootUrl,
      clientID: this.config.oAuth2Config.clientId
    });
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    return new Date().getTime() < this.expiresAt;
  }

  getAccessToken(): string {
    return this.accessToken || '';
  }
}
