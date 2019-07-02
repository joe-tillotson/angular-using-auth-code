import { Injectable, OnInit, Inject } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';

import { AuthConfigurationInterface } from '../models/auth-config.interface';
import { AUTH_CONFIG } from '../models/auth-config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly appRootUrl = 'http://localhost:3100/';
  private readonly SCOPE: string = 'openid profile email';
  private readonly RESPONSE_TYPE: string = 'token id_token';
  private readonly authConfig: AuthConfigurationInterface;
  private readonly authRouter: Router;
  private accessToken: string;
  private auth0Client: Auth0Client;
  private renewPromise: Promise<string>;
  private loggedInValue = false;

  // Create a stream of logged in status to communicate throughout app
  private loggedInSource = new BehaviorSubject<boolean>(this.loggedInValue);
  loggedIn$ = this.loggedInSource.asObservable();

  // Allow other services to observe the result of fetching the user's oAuth profile
  private userProfileResultSource: ReplaySubject<any>;
  oAuthProfileResult$: Observable<any>;

  // TODO improve the naming & declaration of these as well
  profile = new BehaviorSubject<any>(null);
  token = new BehaviorSubject<string>(null);

  constructor(public router: Router, @Inject(AUTH_CONFIG) private readonly config: AuthConfigurationInterface) {
    this.authConfig = config;
    this.authRouter = router;
    /*
    this.auth0 = new auth0.WebAuth({
      clientID: config.oAuth2Config.clientId,
      domain: config.oAuth2Config.clientDomain,
      responseType: this.RESPONSE_TYPE,
      redirectUri: this.appRootUrl,
      scope: this.SCOPE,
      audience: config.oAuth2Config.audience
    });
    */
  }

  async getAuth0Client(): Promise<Auth0Client> {
    // TODO: question: how/where to specify the responseType and the scope when authenticating?
    // see `interface AuthorizeOptions extends BaseLoginOptions` in global.d.ts
    if (!this.auth0Client) {
      this.auth0Client = await createAuth0Client({
        domain: this.authConfig.oAuth2Config.clientDomain,
        client_id: this.authConfig.oAuth2Config.clientId,
        audience: this.authConfig.oAuth2Config.audience,
        redirect_uri: `${window.location.origin}/callback`
      });

      try {
        this.accessToken = await this.auth0Client.getTokenSilently();
        this.loggedInSource.next(await this.auth0Client.isAuthenticated());

        this.loggedInSource.subscribe(async isAuthenticated => {
          if (isAuthenticated) {
            this.token.next(this.accessToken);
            return this.profile.next(await this.auth0Client.getUser());
          }

          this.token.next('');
          this.profile.next(null);
        });

      } catch {}

      return this.auth0Client;
    }

    return this.auth0Client;
  }

  // TODO: this method blows up the app if called - figure out why?
  async isAuthenticated(): Promise<boolean> {
    const client = await this.getAuth0Client();
    return await client.isAuthenticated();
  }

  async login() {
    await this.auth0Client.loginWithRedirect({
      redirect_uri: `${window.location.origin}/callback`
    });
  }

  getFreshToken(): string {
    // TODO: flesh out
    return '';
  }

  logout(): void {
    this.auth0Client.logout({
      client_id: this.authConfig.oAuth2Config.clientId,
      returnTo: window.location.origin
    });
  }

}
