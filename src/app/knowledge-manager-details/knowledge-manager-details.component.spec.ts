import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeManagerDetailsComponent } from './knowledge-manager-details.component';

describe('KnowledgeManagerDetailsComponent', () => {
  let component: KnowledgeManagerDetailsComponent;
  let fixture: ComponentFixture<KnowledgeManagerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeManagerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeManagerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
