import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CallApiComponent } from './call-api.component';
import { ApiService } from '../services/api.service';
import { ApiServiceMock } from '../services/api.service.mock';
import { MaterialModule } from '../material.module';

describe('CallApiComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallApiComponent ],
      imports: [
        MaterialModule,
        HttpClientModule
      ],
      providers: [
        { provide: ApiService, useValue: new ApiServiceMock() }
      ]
    })
    .compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CallApiComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
