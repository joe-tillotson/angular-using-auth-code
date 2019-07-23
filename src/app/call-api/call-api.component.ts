import { Component } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-api.component.html',
  styleUrls: ['./call-api.component.css']
})
export class CallApiComponent {

  constructor(public apiService: ApiService) { }

  async callApi() {
    const response = await this.apiService.getApiResource();

    if (response) {
      console.log('Authorizations: ' + JSON.stringify(response));
    }
  }

}
