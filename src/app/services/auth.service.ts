import { Injectable, OnInit, Inject } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs/operators';

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
  private gettingAuth0Client: boolean = false;

  // Create a stream of logged in status to communicate throughout app
  private loggedInSource: BehaviorSubject<boolean>;
  loggedIn$: Observable<boolean>;

  // Allow components to observe the result of fetching the user's oAuth profile
  private userProfileResultSource: ReplaySubject<any>;
  profile$: Observable<any>;

  // Allow components to observe the result of obtaining a fresh access_token
  private accessTokenSource: BehaviorSubject<string>;
  token$: Observable<string>;


  constructor(public router: Router, @Inject(AUTH_CONFIG) private readonly config: AuthConfigurationInterface) {
    this.authConfig = config;
    this.authRouter = router;
    /*
    // fyi - this was the constructor of the 'client' from auth0-js
    this.auth0 = new auth0.WebAuth({
      clientID: config.oAuth2Config.clientId,
      domain: config.oAuth2Config.clientDomain,
      responseType: this.RESPONSE_TYPE,
      redirectUri: this.appRootUrl,
      scope: this.SCOPE,
      audience: config.oAuth2Config.audience
    });
    */

    this.loggedInSource = new BehaviorSubject(false);
    this.loggedIn$ = this.loggedInSource.asObservable().pipe(distinctUntilChanged());

    this.userProfileResultSource = new ReplaySubject<any>(1);
    this.profile$ = this.userProfileResultSource.asObservable();

    this.accessTokenSource = new BehaviorSubject<string>(null);
    this.token$ = this.accessTokenSource.asObservable().pipe(distinctUntilChanged());
  }

  // TODOs:
  //   ) figure out how to best allow this method to be called >1 times but only:
  //      - call getTokenSilently() once at a time (return same promise if already exists)
  //   (currently it is being called twice when any auth-guarded component is hard
  //    reloaded)

  async getAuth0Client(): Promise<Auth0Client> {
    // TODO: question: how/where to specify the responseType and the scope when authenticating?
    // see `interface AuthorizeOptions extends BaseLoginOptions` in global.d.ts
    // if (!this.auth0Client && !this.gettingAuth0Client) {
    if (!this.auth0Client) {
      
      this.gettingAuth0Client = true;
      this.auth0Client = await createAuth0Client({
        domain: this.authConfig.oAuth2Config.clientDomain,
        client_id: this.authConfig.oAuth2Config.clientId,
        audience: this.authConfig.oAuth2Config.audience,
        redirect_uri: `${window.location.origin}/callback`
      });
      this.gettingAuth0Client = false;

      try {
        this.accessToken = await this.auth0Client.getTokenSilently();
        this.loggedInSource.next(await this.auth0Client.isAuthenticated());

        this.loggedInSource.subscribe(async isAuthenticated => {
          if (isAuthenticated) {
            this.accessTokenSource.next(this.accessToken);
            return this.userProfileResultSource.next(await this.auth0Client.getUser());
          }

          this.accessTokenSource.next('');
          this.userProfileResultSource.next(null);
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
