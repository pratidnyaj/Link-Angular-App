import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceContractsComponent } from './add-service-contracts.component';

describe('AddServiceContractsComponent', () => {
  let component: AddServiceContractsComponent;
  let fixture: ComponentFixture<AddServiceContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
