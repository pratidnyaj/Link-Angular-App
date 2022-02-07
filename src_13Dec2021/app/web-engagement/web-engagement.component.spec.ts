import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebEngagementComponent } from './web-engagement.component';

describe('WebEngagementComponent', () => {
  let component: WebEngagementComponent;
  let fixture: ComponentFixture<WebEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebEngagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
