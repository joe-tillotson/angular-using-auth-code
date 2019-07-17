import {Component, OnInit} from '@angular/core';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isAuthenticated = false;

  constructor(public authService: AuthService) { }

  async ngOnInit() {
    this.authService.loggedIn$.subscribe(value => {
      this.isAuthenticated = value;
    });
  }

}
