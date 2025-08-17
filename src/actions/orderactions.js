import axios from "axios";
import { USER_ORDER_REQUEST, USER_ORDER_SUCCESS, USER_ORDER_FAIL, USER_ORDERSTAT_REQUEST, USER_ORDERSTAT_SUCCESS, USER_ORDERSTAT_FAIL, ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, USERS_ALLORDERS_REQUEST ,USERS_ALLORDERS_SUCCESS,USERS_ALLORDERS_FAIL  } from "../constants/orderconstants";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createorder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ORDER_REQUEST })
        const { data } = await axios.post(`${API_BASE_URL}/api/v1/ord/order/create`, order, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
        dispatch({
            type: USER_ORDER_SUCCESS,
            payload: data
        })
        const state = getState();
        localStorage.setItem("myorder", JSON.stringify(state.myorders.orderdet));
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_ORDER_FAIL,
            payload: error.response.data.message
        });
    }
}


export const updatestatus = (orderid, orderStatus) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ORDERSTAT_REQUEST });
        const { data } = await axios.put(`${API_BASE_URL}/api/v1/ord/updateorder/${orderid}`, {orderStatus} ,{
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
        dispatch({
            type: USER_ORDERSTAT_SUCCESS,
            payload: data
        })
        const state = getState();
        localStorage.setItem("myorder", JSON.stringify(state.myorders.orderdet));
    }
    catch (error) {
        dispatch({
            type: USER_ORDERSTAT_FAIL,
            payload: error.response.data.message
        });
        console.log(error)
    }
}

export const usersallorders = () => async(dispatch) => {
    try {
        dispatch({ type: USERS_ALLORDERS_REQUEST })
        const { data } = await axios.get(`${API_BASE_URL}/api/v1/ord/getallmyorders`, { withCredentials: true})
        dispatch({
            type: USERS_ALLORDERS_SUCCESS,
            payload: data
        })
        localStorage.setItem("allmyorders", JSON.stringify(data.order))
    } catch (error) {
        dispatch({
            type: USERS_ALLORDERS_FAIL,
            payload: error.response.data.message
        });
    }
}

export const getallorders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST })
        const { data } = await axios.get(`${API_BASE_URL}/api/v1/ord/allorders`, { withCredentials: true})
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })
        const state = getState();       
      localStorage.setItem("Allorders", JSON.stringify(state.allorders.orderdets));
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        });
    }
}