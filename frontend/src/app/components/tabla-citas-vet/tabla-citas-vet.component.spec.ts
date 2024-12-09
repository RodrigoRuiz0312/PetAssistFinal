import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCitasVetComponent } from './tabla-citas-vet.component';

describe('TablaCitasVetComponent', () => {
  let component: TablaCitasVetComponent;
  let fixture: ComponentFixture<TablaCitasVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaCitasVetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaCitasVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
