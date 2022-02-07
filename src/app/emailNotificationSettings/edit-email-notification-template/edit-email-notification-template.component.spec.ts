import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailNotificationTemplateComponent } from './edit-email-notification-template.component';

describe('EditEmailNotificationTemplateComponent', () => {
  let component: EditEmailNotificationTemplateComponent;
  let fixture: ComponentFixture<EditEmailNotificationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmailNotificationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmailNotificationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
