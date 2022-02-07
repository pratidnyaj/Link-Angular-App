import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedFieldComponent } from './customized-field.component';

describe('CustomizedFieldComponent', () => {
  let component: CustomizedFieldComponent;
  let fixture: ComponentFixture<CustomizedFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
