import { TestBed, waitForAsync } from '@angular/core/testing';

import { AuthService } from '../services/auth.service';
import { AuthServiceMock } from '../services/auth.service.mock';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      providers: [
        { provide: AuthService, useValue: new AuthServiceMock() }
      ]
    })
    .compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
