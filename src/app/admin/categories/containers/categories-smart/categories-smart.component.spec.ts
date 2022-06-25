import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSmartComponent } from './categories-smart.component';

describe('CategoriesSmartComponent', () => {
  let component: CategoriesSmartComponent;
  let fixture: ComponentFixture<CategoriesSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesSmartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
