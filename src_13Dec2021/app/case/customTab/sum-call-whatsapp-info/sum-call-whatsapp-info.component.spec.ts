import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumCallWhatsappInfoComponent } from './sum-call-whatsapp-info.component';

describe('SumCallWhatsappInfoComponent', () => {
  let component: SumCallWhatsappInfoComponent;
  let fixture: ComponentFixture<SumCallWhatsappInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumCallWhatsappInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumCallWhatsappInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
