import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCasesComponent } from './client-cases.component';

describe('ClientCasesComponent', () => {
  let component: ClientCasesComponent;
  let fixture: ComponentFixture<ClientCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
