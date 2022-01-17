import {
  FETCH_ADDRESSES,
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
  FETCH_FAVORITE_PRODUCTS,
  FETCH_ORDERS,
  FETCH_ORDER
} from "../types";

const initialState = {
  addresses: [],
  favoriteProducts: [],
  orders: { orders: [], order: {} }
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ADDRESSES:
      return { ...state, addresses: payload };
    case CREATE_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, payload]
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(address => address.id !== payload)
      };
    case UPDATE_ADDRESS:
      const updatedAddresses = state.addresses.map(address => {
        if (address.id === action.id) {
          return { ...address, ...action.payload };
        }
        return address;
      });
      return {
        ...state,
        addresses: updatedAddresses
      };
    case FETCH_FAVORITE_PRODUCTS:
      return { ...state, favoriteProducts: payload };
    case FETCH_ORDERS:
      return { ...state, orders: { ...state.orders, orders: payload } };
    case FETCH_ORDER:
      return { ...state, orders: { ...state.orders, order: payload } };
    default:
      return state;
  }
};
