import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import * as productActions from './product.actions';
import { Product } from '../models/product-model';
import { ProductPayload } from '../components/create-product/create-product.payload';

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

    @Effect()
    loadProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.LoadProduct>(
            productActions.ProductActionTypes.LOAD_PRODUCT
        ),
        mergeMap((actions: productActions.LoadProduct) =>
            this.productService.getProductById(actions.payload).pipe(
                map((product: Product) => new productActions.LoadProductSuccess(product)),
                catchError(err => of(new productActions.LoadProductFail(err)))
            )
        )
    )

    @Effect()
    createProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.CreateProduct>(
            productActions.ProductActionTypes.CREATE_PRODUCT
        ),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: ProductPayload) =>
            this.productService.createProduct(product).pipe(
                map((product: Product) => new productActions.CreateProductSuccess(product)),
                catchError(err => of(new productActions.CreateProductFail(err)))
            )
        )
    )

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.UpdateProduct>(
            productActions.ProductActionTypes.UPDATE_PRODUCT
        ),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.updateProduct(product).pipe(
                map((product: Product) => new productActions.UpdateProductSuccess({
                    id: product._id,
                    changes: product
                })),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    )

    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.DeleteProduct>(
            productActions.ProductActionTypes.DELETE_PRODUCT
        ),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((id: string) =>
            this.productService.deleteProduct(id).pipe(
                map(() => new productActions.DeleteProductSuccess(id)),
                catchError(err => of(new productActions.DeleteProductFail(err)))
            )
        )
    )

}