import { combineReducers, applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { productreducer, productDETAILreducer } from "./reducers/productReducer";
import { alluserreducer, profilereducer, userreducer } from "./reducers/usereducer";
import { cartreducer } from "./reducers/cartreducer";
import { allordersreducer, orderreducer } from "./reducers/orderreducer";

// 1. Combine all reducers
const rootReducer = combineReducers({
  products: productreducer,
  productdetails: productDETAILreducer,
  userdetails: userreducer,
  updatedprofile: profilereducer,
  cart: cartreducer,
  myorders: orderreducer,
  AllUsers: alluserreducer,
  allorders: allordersreducer,
});

// 2. Redux persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "myorders", "userdetails"], 
  // only persist these slices
};

// 3. Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Middlewares
const middleware = [thunk];

// 5. Redux devtools enhancer
const composeEnhancers =
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

// 6. Create store with persisted reducer
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// 7. Persistor
export const persistor = persistStore(store);
export default store;
