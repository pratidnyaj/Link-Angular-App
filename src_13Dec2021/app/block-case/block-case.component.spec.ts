import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCaseComponent } from './block-case.component';

describe('BlockCaseComponent', () => {
  let component: BlockCaseComponent;
  let fixture: ComponentFixture<BlockCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
