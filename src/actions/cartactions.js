import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartconstants";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const addtocart = (id, quantity, userid) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/prod/product/${id}`, { withCredentials: true});
    dispatch({
        type: ADD_TO_CART, 
        payload: {
            user_id : userid,
            product : data.product._id,
            name : data.product.name,
            price : data.product.price,
            stock : data.product.stock,
            image : data.product.images[0].url,
            quantity
        }
    });
    const state = getState();
    localStorage.setItem("cartitem", JSON.stringify(state.cart.cartitems));
};

export const removefromcart = (id, quantity, userid) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/prod/product/${id}`, { withCredentials: true});
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
            user_id: userid,
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            stock: data.product.stock,
            image: data.product.images[0].url,
            quantity
        }
    });

    // Retrieve the updated cart items from the action payload
    const state = getState();

    // Store the updated cart items in local storage
    localStorage.setItem("cartitem", JSON.stringify(state.cart.cartitems));
};
