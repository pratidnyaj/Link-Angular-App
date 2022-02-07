import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessRulesComponent } from './add-business-rules.component';

describe('AddBusinessRulesComponent', () => {
  let component: AddBusinessRulesComponent;
  let fixture: ComponentFixture<AddBusinessRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBusinessRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
