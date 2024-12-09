import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioVetComponent } from './inicio-vet.component';

describe('InicioVetComponent', () => {
  let component: InicioVetComponent;
  let fixture: ComponentFixture<InicioVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioVetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
