import { Update } from '@ngrx/entity';
import { Action as action } from '@ngrx/store';
import { ProductPayload } from '../components/create-product/create-product.payload';
import { Product } from '../models/product-model';

export enum ProductActionTypes {
    //load all products
    LOAD_PRODUCTS = "[Product] Load Products",
    LOAD_PRODUCTS_SUCCESS = "[Product] Load Products Success",
    LOAD_PRODUCTS_FAIL = "[Product] Load Products Fail",
    //load single product
    LOAD_PRODUCT = "[Product] Load Product",
    LOAD_PRODUCT_SUCCESS = "[Product] Load Product Success",
    LOAD_PRODUCT_FAIL = "[Product] Load Product Fail",
    //create product
    CREATE_PRODUCT = "[Product] Create Product",
    CREATE_PRODUCT_SUCCESS = "[Product] Create Product Success",
    CREATE_PRODUCT_FAIL = "[Product] Create Product Fail",
    //update product
    UPDATE_PRODUCT = "[Product] Update Product",
    UPDATE_PRODUCT_SUCCESS = "[Product] Update Product Success",
    UPDATE_PRODUCT_FAIL = "[Product] Update Product Fail",
    //delete product
    DELETE_PRODUCT = "[Product] Delete Product",
    DELETE_PRODUCT_SUCCESS = "[Product] Delete Product Success",
    DELETE_PRODUCT_FAIL = "[Product] Delete Product Fail",
}

//load all products
export class LoadProducts implements action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS
}

export class LoadProductsSuccess implements action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS

    constructor(public payload: Product[]) { }
}

export class LoadProductsFail implements action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_FAIL

    constructor(public payload: string) { }
}

//load single product
export class LoadProduct implements action {
    readonly type = ProductActionTypes.LOAD_PRODUCT

    constructor(public payload: string) { }
}

export class LoadProductSuccess implements action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_SUCCESS

    constructor(public payload: Product) { }
}

export class LoadProductFail implements action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_FAIL

    constructor(public payload: string) { }
}

//create product
export class CreateProduct implements action {
    readonly type = ProductActionTypes.CREATE_PRODUCT

    constructor(public payload: ProductPayload) { }
}

export class CreateProductSuccess implements action {
    readonly type = ProductActionTypes.CREATE_PRODUCT_SUCCESS

    constructor(public payload: Product){}
}

export class CreateProductFail implements action {
    readonly type = ProductActionTypes.CREATE_PRODUCT_FAIL

    constructor(public payload: string) { }
}

//update product
export class UpdateProduct implements action {
    readonly type = ProductActionTypes.UPDATE_PRODUCT

    constructor(public payload: Product) { }
}

export class UpdateProductSuccess implements action {
    readonly type = ProductActionTypes.UPDATE_PRODUCT_SUCCESS

    constructor(public payload: Update<Product>){}
}

export class UpdateProductFail implements action {
    readonly type = ProductActionTypes.UPDATE_PRODUCT_FAIL

    constructor(public payload: string) { }
}

//delete product
export class DeleteProduct implements action {
    readonly type = ProductActionTypes.DELETE_PRODUCT

    constructor(public payload: string) { }
}

export class DeleteProductSuccess implements action {
    readonly type = ProductActionTypes.DELETE_PRODUCT_SUCCESS

    constructor(public payload: string) { }
}

export class DeleteProductFail implements action {
    readonly type = ProductActionTypes.DELETE_PRODUCT_FAIL

    constructor(public payload: string) { }
}

export type Action = 
    LoadProducts | LoadProductsSuccess | LoadProductsFail |
    LoadProduct | LoadProductSuccess | LoadProductFail |
    CreateProduct | CreateProductSuccess | CreateProductFail |
    UpdateProduct | UpdateProductSuccess | UpdateProductFail |
    DeleteProduct | DeleteProductSuccess | DeleteProductFail;