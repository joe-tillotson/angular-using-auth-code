import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-callback',
  template: ``,
  styles: []
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    const client = await this.authService.getAuth0Client();
    const result = await client.handleRedirectCallback();

    const targetRoute =
      result.appState && result.appState.target ? result.appState.target : '';

    // TODO: make sure no other interactions with the auth-service are required here
    //   for the app to behave properly

    this.router.navigate([targetRoute]);
  }

}
