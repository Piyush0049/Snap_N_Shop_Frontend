import axios from "axios"
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ALL_ERRORS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESS, PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS, PRODUCT_REVIEW_FAIL, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants"

export const allproducts = (keyword = "", page = "", gt = 0, lt = 50000, categ = "") => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        let link = `https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/products?keyword=${keyword}&page=${page}&price[gt]=${gt}&price[lt]=${lt}`;
        if (categ) {
            link = `https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/products?keyword=${keyword}&page=${page}&price[gt]=${gt}&price[lt]=${lt}&category=${categ}`;
        }
        const { data } = await axios.get(link, { withCredentials: true});
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })

    }
}



export const resolveerror = async (dispatch) => {
    dispatch({ type: CLEAR_ALL_ERRORS })
}

export const productdetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const { data } = await axios.get(`https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/product/${id}`, { withCredentials: true});
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })

    }
}


export const productreview = (productid, rating, comment) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_REQUEST })
        const { data } = await axios.post("https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/product/addreview", { productid, rating, comment }, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error.response.data.message
        })

    }
}

export const updateproduct = (id, n, d, p, c, s, u) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })
        const { data } = await axios.put(`https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/product/${id}`, {
            name: n, description: d, price: p, category: c, stock: s, images: {
                public_id: "public",
                url: u
            }
        }, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response.data.message
        })

    }
}

