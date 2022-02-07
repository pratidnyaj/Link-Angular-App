import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCaseModalComponent } from './contact-case-modal.component';

describe('ContactCaseModalComponent', () => {
  let component: ContactCaseModalComponent;
  let fixture: ComponentFixture<ContactCaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCaseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
