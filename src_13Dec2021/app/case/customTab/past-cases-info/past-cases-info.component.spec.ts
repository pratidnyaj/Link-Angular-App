import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastCasesInfoComponent } from './past-cases-info.component';

describe('PastCasesInfoComponent', () => {
  let component: PastCasesInfoComponent;
  let fixture: ComponentFixture<PastCasesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastCasesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastCasesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
