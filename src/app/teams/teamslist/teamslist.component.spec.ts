import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamslistComponent } from './teamslist.component';

describe('TeamslistComponent', () => {
  let component: TeamslistComponent;
  let fixture: ComponentFixture<TeamslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
