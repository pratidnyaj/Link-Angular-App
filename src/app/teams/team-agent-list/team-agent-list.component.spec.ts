import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAgentListComponent } from './team-agent-list.component';

describe('TeamAgentListComponent', () => {
  let component: TeamAgentListComponent;
  let fixture: ComponentFixture<TeamAgentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAgentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
