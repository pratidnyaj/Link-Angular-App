import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonwledgeManagerComponent } from './konwledge-manager.component';

describe('KonwledgeManagerComponent', () => {
  let component: KonwledgeManagerComponent;
  let fixture: ComponentFixture<KonwledgeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonwledgeManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonwledgeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
