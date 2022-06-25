import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../material/material.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductSmartComponent } from './container/product-smart/product-smart.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductFormComponent,
    ProductSmartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
