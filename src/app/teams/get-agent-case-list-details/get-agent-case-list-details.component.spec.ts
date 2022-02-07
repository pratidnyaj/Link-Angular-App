import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAgentCaseListDetailsComponent } from './get-agent-case-list-details.component';

describe('GetAgentCaseListDetailsComponent', () => {
  let component: GetAgentCaseListDetailsComponent;
  let fixture: ComponentFixture<GetAgentCaseListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAgentCaseListDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAgentCaseListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
