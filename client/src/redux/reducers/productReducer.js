import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  UPDATE_FAVORITE_PRODUCTS,
  ADD_TO_CART
} from "../types";

const initialState = {
  pages_count: null,
  products_count: null,
  ordering: null,
  max_price: null,
  min_price: null,
  current: null,
  next: null,
  previous: null,
  products: [],
  product: { sizes: [], colors: [] }
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PRODUCTS:
      return { ...state, ...payload };
    case FETCH_PRODUCT:
      return { ...state, product: payload };
    case UPDATE_FAVORITE_PRODUCTS:
      return { ...state, product: { ...payload } };
    case ADD_TO_CART:
      return { ...state, product: { ...state.product, is_in_cart: true } };
    default:
      return state;
  }
};
