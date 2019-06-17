import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AuthServiceMock } from './auth.service.mock';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthGuardService,
        { provide: AuthService, useValue: new AuthServiceMock() }
      ]
    });

    it('should be created', inject([ AuthGuardService ], (service: AuthGuardService) => {
      expect(service).toBeTruthy();
    }));
  });
});
