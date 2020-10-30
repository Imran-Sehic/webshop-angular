const initialState = {
    products: [
        {
            name: "Image Product",
            description: "nice image, a one to have"
        }
    ],
    loading: false,
    loaded: true
};

export function productReducer(state = initialState, action) {
    switch (action.type) {
        case "LOAD_PRODUCTS": {
            return {
                ...state, 
                loading: true, 
                loaded: false
            };
        }

        default: {
            return state;
        }
    }
}