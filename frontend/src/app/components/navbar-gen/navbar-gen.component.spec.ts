import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarGenComponent } from './navbar-gen.component';

describe('NavbarGenComponent', () => {
  let component: NavbarGenComponent;
  let fixture: ComponentFixture<NavbarGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarGenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
