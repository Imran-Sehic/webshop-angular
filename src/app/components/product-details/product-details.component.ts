import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Product } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  updateProductForm: FormGroup;
  product: Product;
  productId: string;
  valid: boolean = true;
  dataLoaded: boolean = false;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.productId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getUserById()
  }

  getUserById() {
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
      this.updateProductForm = new FormGroup({
        name: new FormControl(this.product.name, Validators.required),
        description: new FormControl(this.product.description, Validators.required)
      });
      this.dataLoaded = true;
      console.log(this.product)
    }, error => {
      throwError(error);
    })
  }

  updateProduct() {
    this.product.name = this.updateProductForm.get('name').value;
    this.product.description = this.updateProductForm.get('description').value;

    if (this.updateProductForm.get('name').valid && this.updateProductForm.get('description').valid) {
      this.valid = true;

      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigateByUrl('')
      })

    } else {
      this.valid = false;
    }
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe(() => {
      this.router.navigateByUrl('');
    })
  }

}
