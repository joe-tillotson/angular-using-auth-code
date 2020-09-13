import { async, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PostDialogComponent } from './post-dialog.component';
import { DataService } from '../services/data.service';
import { MaterialModule } from '../material.module';

describe('PostDialogComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostDialogComponent
      ],
      providers: [
        DataService,
        MaterialModule,
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PostDialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
