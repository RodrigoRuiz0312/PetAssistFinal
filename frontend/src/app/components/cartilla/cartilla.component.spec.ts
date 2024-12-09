import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartillaComponent } from './cartilla.component';

describe('CartillaComponent', () => {
  let component: CartillaComponent;
  let fixture: ComponentFixture<CartillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartillaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
