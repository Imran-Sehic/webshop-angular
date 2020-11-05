import * as productActions from './product.actions';
import { Product } from '../models/product-model';
import * as fromRoot from './app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ProductState extends EntityState<Product> {
    selectedProductId: number | null;
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState {
    products: ProductState
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
    selectId: Product => Product._id
});

export const defaultProduct: ProductState = {
    ids: [],
    entities: {},
    selectedProductId: null,
    loading: false,
    loaded: false,
    error: ""
}

export const initialState = productAdapter.getInitialState(defaultProduct);

export function productReducer(state = initialState, action: productActions.Action): ProductState {
    switch(action.type) {
        case productActions.ProductActionTypes.LOAD_PRODUCTS: {
            return {
                ...state,
                loading: true
            };
        }
        case productActions.ProductActionTypes.LOAD_PRODUCTS_SUCCESS: {
            return productAdapter.addMany(action.payload, {
                ...state,
                loading: false,
                loaded: true
            })
        }
        case productActions.ProductActionTypes.LOAD_PRODUCTS_FAIL: {
            return {
                ...state,
                entities: {},
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
    productAdapter.getSelectors().selectAll
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