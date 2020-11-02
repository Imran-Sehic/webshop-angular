import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Product } from '../../models/product-model';
import { ProductService } from '../../services/product.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromProduct from '../../state/product.reducer';
import * as productActions from 'src/app/state/product.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private router: Router, private store: Store<fromProduct.AppState>) {}

  ngOnInit(): void {
    /*this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    }, error => {
      throwError(error);
    })*/
    this.store.dispatch(new productActions.LoadProducts())
    this.products$ = this.store.pipe(select(fromProduct.getProducts))
  }

  goToDetails(id: string) {
    this.router.navigateByUrl('details/' + id);
  }

}
