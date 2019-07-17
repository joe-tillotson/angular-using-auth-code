import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthConfigurationInterface } from '../models/auth-config.interface';
import { AUTH_CONFIG } from '../models/auth-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  accessToken: string = '';
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

  // contrived: at this point no API call is being made, this class is just demonstrates the concept.
  // For now, it simply writes the request to be made to console.log
  /*
  public getApiResource(): Observable<any> {
    return this.authenticatedGet(this.apiBaseUrl + '/foo/resource', this.options);
  }
  */
  getApiResource(): void {
    console.log('api call being made to: ' + this.apiBaseUrl + '/foo/resource');
    console.log('with access_token: ' + this.accessToken);
  }

  private authenticatedGet(url: string, headers: object): any {
    return this.httpClient.get(url, headers);
  }

  private handleError(error: string): void {
    console.log('Get authorizations map error: ' + error);
  }

}
