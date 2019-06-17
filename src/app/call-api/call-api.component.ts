import { Component } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-api.component.html',
  styleUrls: ['./call-api.component.css']
})
export class CallApiComponent {

  constructor(public apiService: ApiService) { }

  callApi() {
    const response = this.apiService.getApiResource();
  }

}
