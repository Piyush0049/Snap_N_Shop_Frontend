import {  combineReducers, applyMiddleware, compose } from 'redux'
import { legacy_createStore as createStore } from 'redux';
import {thunk} from 'redux-thunk';
import {  productreducer } from './reducers/productReducer';
import { alluserreducer, profilereducer, userreducer } from './reducers/usereducer';
import { productDETAILreducer } from './reducers/productReducer';
import { cartreducer } from './reducers/cartreducer';
import { allordersreducer, orderreducer } from './reducers/orderreducer';

const reducer = combineReducers({
    products: productreducer,
    productdetails: productDETAILreducer,
    userdetails: userreducer,
    updatedprofile: profilereducer,
    cart: cartreducer,
    myorders: orderreducer,
    AllUsers: alluserreducer,
    allorders: allordersreducer,
});

// Define the initial state
let initstate = {
    cart: {
        cartitems: localStorage.getItem("cartitem") 
            ? JSON.parse(localStorage.getItem("cartitem")) 
            : [],
    },
    myorders: {
        orderdet: localStorage.getItem("allmyorders") 
            ? JSON.parse(localStorage.getItem("allmyorders")) 
            : [],
    },
};

// Define middleware
const middleware = [thunk];

// Set up the Redux DevTools extension if it's available
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    : compose;

// Create the Redux store with middleware and DevTools integration
const store = createStore(
    reducer,
    initstate,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;