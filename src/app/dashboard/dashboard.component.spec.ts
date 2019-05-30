import { async, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { AuthServiceMock } from '../services/auth.service.mock';
import { MaterialModule } from '../material.module';

describe('DashboardComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [
        DataService,
        { provide: AuthService, useValue: new AuthServiceMock() }
      ]
    })
    .compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
