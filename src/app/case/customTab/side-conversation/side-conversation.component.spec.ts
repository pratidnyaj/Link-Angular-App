import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideConversationComponent } from './side-conversation.component';

describe('SideConversationComponent', () => {
  let component: SideConversationComponent;
  let fixture: ComponentFixture<SideConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideConversationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
