import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  userProfile: Observable<any>;

  private auth0Client: Auth0Client;

  constructor(public readonly authService: AuthService) {
    this.userProfile = authService.profile$;
  }

  async ngOnInit() {
    this.auth0Client = await this.authService.getAuth0Client();

    this.authService.loggedIn$.subscribe(value => {
      this.isAuthenticated = value;
    });
  }
}
