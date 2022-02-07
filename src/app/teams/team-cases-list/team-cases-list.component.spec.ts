import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCasesListComponent } from './team-cases-list.component';

describe('TeamCasesListComponent', () => {
  let component: TeamCasesListComponent;
  let fixture: ComponentFixture<TeamCasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCasesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
