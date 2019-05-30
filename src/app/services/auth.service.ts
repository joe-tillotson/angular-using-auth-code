import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';

// why do you need defining window as any?
// check this: https://github.com/aws/aws-amplify/issues/678#issuecomment-389106098
(window as any).global = window;

@Injectable()
export class AuthService {
  private readonly clientId = 'g7NZP2jWplMuOPYdL5svx1bq9W41tOW6';
  private readonly appRootUrl = 'http://localhost:3100/';

  auth0 = new auth0.WebAuth({
    clientID: this.clientId,
    domain: 'devinator.auth0.com',
    responseType: 'token',
    redirectUri: this.appRootUrl,
    scope: 'openid'
  });

  accessToken: string;
  expiresAt: number;

  constructor(public router: Router) {}

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
      clientID: this.clientId
    });
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    return new Date().getTime() < this.expiresAt;
  }
}
