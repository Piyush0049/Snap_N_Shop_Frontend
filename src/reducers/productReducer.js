import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ALL_ERRORS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESS, PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS, PRODUCT_REVIEW_FAIL, PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS } from "../components/constants/productConstants";

export const productreducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          products: []
        };
      case ALL_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload.products,
          productcount: action.payload.productcount,
          resultperpage : action.payload.resultperpage,
          allProducts : action.payload.allproducts,
        };
      case ALL_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      case CLEAR_ALL_ERRORS:
        return {
          ...state,
          error: null
        };
      default:
        return state ; // Don't forget the default case
    }
  };
  

  export const productDETAILreducer = (state = {product : {}} , action) => {
    switch (action.type) {
      case PRODUCT_DETAIL_REQUEST:
      case PRODUCT_REVIEW_REQUEST:
      case PRODUCT_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
          product: {}
        };
      case PRODUCT_DETAIL_SUCCESS:
      case PRODUCT_REVIEW_SUCCESS:
      case PRODUCT_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload
        };
      case PRODUCT_DETAIL_FAIL:
      case PRODUCT_REVIEW_FAIL:
      case PRODUCT_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      case CLEAR_ALL_ERRORS:
        return {
          ...state,
          error: null
        };
      default:
        return state ; // Don't forget the default case
    }
  };
  




