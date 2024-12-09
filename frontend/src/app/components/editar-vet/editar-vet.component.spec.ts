import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVetComponent } from './editar-vet.component';

describe('EditarVetComponent', () => {
  let component: EditarVetComponent;
  let fixture: ComponentFixture<EditarVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarVetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
