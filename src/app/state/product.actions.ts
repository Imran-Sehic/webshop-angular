import { Action as action} from '@ngrx/store';
import { Product } from '../models/product-model';

export enum ProductActionTypes {
    LOAD_PRODUCTS = "[Product] Load Products",
    LOAD_PRODUCTS_SUCCESS = "[Product] Load Products Success",
    LOAD_PRODUCTS_FAIL = "[Product] Load Products Fail"
}

export class LoadProducts implements action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS
}

export class LoadProductsSuccess implements action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS

    constructor(public payload: Product[]){}
}

export class LoadProductsFail implements action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_FAIL

    constructor(public payload: string){}
}

export type Action = LoadProducts | LoadProductsSuccess | LoadProductsFail;