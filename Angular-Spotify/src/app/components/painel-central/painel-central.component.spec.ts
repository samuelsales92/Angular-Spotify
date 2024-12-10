import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelCentralComponent } from './painel-central.component';

describe('PainelCentralComponent', () => {
  let component: PainelCentralComponent;
  let fixture: ComponentFixture<PainelCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PainelCentralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PainelCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
