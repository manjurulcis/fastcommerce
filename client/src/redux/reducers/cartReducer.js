import { FETCH_CART, CREATE_ORDER } from "../types";

const initialState = {
  total_price: null,
  total_customer_profit: null,
  items_count: null,
  items: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CART:
      return { ...state, ...payload };
    case CREATE_ORDER:
      return initialState;
    default:
      return state;
  }
};
