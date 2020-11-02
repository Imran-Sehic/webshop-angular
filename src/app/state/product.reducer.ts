import * as productActions from './product.actions';
import { Product } from '../models/product-model';
import * as fromRoot from './app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductState {
    products: Product[],
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState {
    products: ProductState
}

export const initialState: ProductState = {
    products: [],
    loading: false,
    loaded: false,
    error: ""
}

export function productReducer(state = initialState, action: productActions.Action): ProductState {
    switch(action.type) {
        case productActions.ProductActionTypes.LOAD_PRODUCTS: {
            return {
                ...state,
                loading: true
            };
        }
        case productActions.ProductActionTypes.LOAD_PRODUCTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                products: action.payload
            };
        }
        case productActions.ProductActionTypes.LOAD_PRODUCTS_FAIL: {
            return {
                ...state,
                products: [],
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

const getProductFeatureState = createFeatureSelector<ProductState>("products")

export const getProducts = createSelector(
    getProductFeatureState,
    (state: ProductState) => state.products
)

export const getProductsLoading = createSelector(
    getProductFeatureState,
    (state: ProductState) => state.loading
)

export const getProductsLoaded = createSelector(
    getProductFeatureState,
    (state: ProductState) => state.loaded
)

export const getError = createSelector(
    getProductFeatureState,
    (state: ProductState) => state.error
)