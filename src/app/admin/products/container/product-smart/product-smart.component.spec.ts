import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSmartComponent } from './product-smart.component';

describe('ProductSmartComponent', () => {
  let component: ProductSmartComponent;
  let fixture: ComponentFixture<ProductSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSmartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
