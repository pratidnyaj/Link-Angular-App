import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNotificationComponent } from './contact-notification.component';

describe('ContactNotificationComponent', () => {
  let component: ContactNotificationComponent;
  let fixture: ComponentFixture<ContactNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
