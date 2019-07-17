import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CallbackComponent } from './callback.component';
import { AuthService } from '../services/auth.service';
import { AuthServiceMock } from '../services/auth.service.mock';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ CallbackComponent ],
      providers: [
        { provide: AuthService, useValue: new AuthServiceMock() }
      ]
    })
    .compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CallbackComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
