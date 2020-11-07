import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Product } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';
import { Store } from '@ngrx/store';
import * as fromProduct from '../../state/product.reducer';
import * as productActions from '../../state/product.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  updateProductForm: FormGroup;
  updatedProduct: Product;
  productId: string;
  valid: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private store: Store<fromProduct.AppState>) {
    this.productId = this.activatedRoute.snapshot.params.id;

    this.updatedProduct = {
      _id: null,
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      _id: null
    })

    this.store.dispatch(new productActions.LoadProduct(this.productId));

    const product$: Observable<Product> = this.store.select(
      fromProduct.getCurrentProduct
    )

    product$.subscribe(currentProduct => {
      if(currentProduct){
        this.updateProductForm.patchValue({
          name: currentProduct.name,
          description: currentProduct.description,
          _id: currentProduct._id
        });
      }
    })

  }

  

  updateProduct() {
    this.updatedProduct.name = this.updateProductForm.get('name').value;
    this.updatedProduct.description = this.updateProductForm.get('description').value;
    this.updatedProduct._id = this.updateProductForm.get('_id').value;

    if (this.updateProductForm.get('name').valid && this.updateProductForm.get('description').valid) {
      this.valid = true;

      this.store.dispatch(new productActions.UpdateProduct(this.updatedProduct))
      this.router.navigateByUrl('')

    } else {
      this.valid = false;
    }
  }

  deleteProduct() {
    if(confirm("Do you really want to delete the product below?")){
      this.store.dispatch(new productActions.DeleteProduct(this.productId));
      this.router.navigateByUrl('')
    }
  }

}
