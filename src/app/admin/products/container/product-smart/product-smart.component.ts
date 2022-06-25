import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';

import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-product-smart',
  templateUrl: './product-smart.component.html',
  styleUrls: ['./product-smart.component.scss'],
})
export class ProductSmartComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.productId = params.get('id');

      if (this.productId) {
        this.getProduct(this.productId);
      }
    });
  }

  handleCreate(dto) {
    this.productsService.createProduct(dto).subscribe((response) => {
      console.log(response);
      this.router.navigate(['./admin/products']);
    });
  }

  getProduct(id: string) {
    this.productsService.getProduct(id).subscribe((product) => {
      this.product = product;
    });
  }
}
