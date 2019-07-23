import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AuthConfigurationInterface } from '../models/auth-config.interface';
import { AUTH_CONFIG } from '../models/auth-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  accessToken: string = null;
  private readonly apiBaseUrl: string;
  private readonly options: any = {
    headers: new HttpHeaders().set('content-type', 'application/json')
  };

  constructor(private readonly httpClient: HttpClient,
      private readonly authService: AuthService,
      @Inject(AUTH_CONFIG) private readonly config: AuthConfigurationInterface) {
    this.apiBaseUrl = this.config.apiBaseUrl;
    this.authService.token$.subscribe(token => {
      this.accessToken = token;
    });
  }

  // use this method to view what API call would made
  /*
  public getApiResource(): void {
    console.log('api call would be made to: ' + this.apiBaseUrl);
    console.log('...with access_token: ' + this.accessToken);
  }
  */

  // use this method to make an actual API call
  public async getApiResource(): Promise<any> {
    return this.authenticatedGet(this.apiBaseUrl + '/auth/token/authorizations/v1', 
      this.options);
  }

  private async authenticatedGet(url: string, headers: object): Promise<any> {
    const client = await this.authService.getAuth0Client();
    const isAuthenticated = await this.authService.isAuthenticated();

    if (isAuthenticated) {
      this.options.headers = this.options.headers.set('Authorization', 'Bearer ' + this.accessToken);
    }

    return this.httpClient.get(url, headers).pipe(
      map((result: any) => result.authorizations),
        catchError(this.handleError.bind(this)))
        .toPromise();
  }

  private handleError(error: string): void {
    console.log('Get authenticated API resource error: ' + error);
  }

}
