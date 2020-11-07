import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductPayload } from './create-product.payload';
import { Store } from '@ngrx/store';
import * as productActions from '../../state/product.actions';
import * as fromProduct from '../../state/product.reducer';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  createProductForm: FormGroup;
  createProductPayload: ProductPayload;
  valid: boolean = true;

  constructor(private productService: ProductService, private router: Router) { 
    this.createProductPayload = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
    this.createProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  createProduct() {
    this.createProductPayload.name = this.createProductForm.get('name').value;
    this.createProductPayload.description = this.createProductForm.get('description').value;

    if(this.createProductForm.get('name').valid && this.createProductForm.get('description').valid){
      this.valid = true;

      new productActions.CreateProduct(this.createProductPayload)
      this.router.navigateByUrl('')

    } else {
      this.valid = false;
    }
  }

}
