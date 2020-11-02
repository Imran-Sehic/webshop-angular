import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import * as productActions from './product.actions';
import { Product } from '../models/product-model';

@Injectable()
export class ProductEffect {

    constructor(private actions$: Actions, private productService: ProductService) { }

    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.LoadProducts>(
            productActions.ProductActionTypes.LOAD_PRODUCTS
        ),
        mergeMap((actions: productActions.LoadProducts) =>
            this.productService.getAllProducts().pipe(
                map((products: Product[]) => new productActions.LoadProductsSuccess(products)),
                catchError(err => of(new productActions.LoadProductsFail(err)))
            )
        )
    )
}