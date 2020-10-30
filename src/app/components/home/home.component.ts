import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Product } from '../../models/product-model';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService, private router: Router, private store: Store<any>) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    }, error => {
      throwError(error);
    })
    /*this.store.dispatch({type: 'LOAD_PRODUCTS'})
    this.store.subscribe(state => (this.products = state.products.products))*/
  }

  goToDetails(id: string) {
    this.router.navigateByUrl('details/' + id);
  }

}
