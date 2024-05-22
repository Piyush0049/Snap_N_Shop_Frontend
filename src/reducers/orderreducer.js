import { USER_ORDER_REQUEST, USER_ORDER_SUCCESS, USER_ORDER_FAIL, USER_ORDERSTAT_REQUEST, USER_ORDERSTAT_SUCCESS, USER_ORDERSTAT_FAIL, ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, USERS_ALLORDERS_REQUEST ,USERS_ALLORDERS_SUCCESS,USERS_ALLORDERS_FAIL } from "../components/constants/orderconstants";

export const orderreducer = (state = { orderdet: [] }, action) => {
    switch (action.type) {
        case USER_ORDER_REQUEST:
        case USER_ORDERSTAT_REQUEST:
        case USERS_ALLORDERS_REQUEST: 
            return {
                ...state,
                loading: true,
            }
        case USER_ORDER_SUCCESS:
            const order = action.payload.order;
            return {
                ...state,
                loading: false,
                orderdet: [...state.orderdet, order] 
            }
        case USERS_ALLORDERS_SUCCESS:
            const allmyorder = action.payload.order;
            return {
                ...state,
                loading: false,
                orderdet:  allmyorder
            }
        case USER_ORDERSTAT_SUCCESS: 
        const updatedorder = action.payload.order;
        return {
            ...state,
            orderdet : state.orderdet.map((order)=> (
                order._id === updatedorder._id ? updatedorder : order
            ))
        }
        case USER_ORDER_FAIL:
        case USER_ORDERSTAT_FAIL:
        case USERS_ALLORDERS_FAIL:
            return {
                ...state,
                loading: false,
                orderdet: []
            }
        default:
            return state;
    }
}


export const allordersreducer = (state = { orderdets: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orderdets: action.payload.order 
            }
        case ALL_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                orderdet: []
            }
        default:
            return state;
    }
}