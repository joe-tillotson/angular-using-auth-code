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
    const authClient = await this.authService.getAuth0Client();
    const authResult = await authClient.handleRedirectCallback();

    const targetRoute =
    authResult.appState && authResult.appState.target ? authResult.appState.target : '';

    this.router.navigate([targetRoute]);
  }

}
