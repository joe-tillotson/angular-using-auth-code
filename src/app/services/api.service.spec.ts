import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { AuthServiceMock } from './auth.service.mock';
import { AUTH_CONFIG } from '../models/auth-config';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [
          ApiService, 
          { provide: AuthService, useValue: new AuthServiceMock() },
          { provide: AUTH_CONFIG, useValue: {apiBaseUrl: '/api'} }
        ]
    });
  });

  it('should be created', inject([ ApiService ], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
