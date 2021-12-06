import * as type from "../Actions/products.action";

const initialState = {
  productList: null,
  loading: true,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_PRODUCTS:
      return {
        productList: action.payload,
        loading: false,
      };
    case type.CREATE_PRODUCT:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    case type.UPDATE_PRODUCT:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    case type.DELETE_PRODUCT:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
