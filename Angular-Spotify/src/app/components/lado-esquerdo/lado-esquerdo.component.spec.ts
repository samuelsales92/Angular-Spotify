import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadoEsquerdoComponent } from './lado-esquerdo.component';

describe('LadoEsquerdoComponent', () => {
  let component: LadoEsquerdoComponent;
  let fixture: ComponentFixture<LadoEsquerdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LadoEsquerdoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LadoEsquerdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
