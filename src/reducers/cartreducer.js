import { ADD_TO_CART, REMOVE_FROM_CART } from "../components/constants/cartconstants";

export const cartreducer = (state = { cartitems: null }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            if (state.cartitems !== null) {
                let exists = state.cartitems.find((i) => i.product === item.product);
                if (exists) {
                    return {
                        ...state,
                        cartitems: state.cartitems.map((i) => (
                            i.product === item.product ? item : i
                        ))
                    };
                }
            }
            return {
                ...state,
                cartitems: [...(state.cartitems || []), item]
            };
            
        case REMOVE_FROM_CART:
            const productToRemove = action.payload.product;
            return {
                ...state,
                cartitems: state.cartitems.filter((item) => item.product !== productToRemove)
            };

        default:
            return state;
    }
};
