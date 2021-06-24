const ITEM_ADD_TO_CART = 'resto/cart/ITEM_ADD_TO_CART';
const ITEM_DELETE_FROM_CART = 'resto/cart/ITEM_DELETE_FROM_CART';
const ORDER_SENDING_STARTED = 'resto/cart/ORDER_SENDING_STARTED';
const ORDER_SENT = 'resto/cart/ORDER_SENT';
const UI_REACTED_TO_ORDER_SEND_SUCCESS =
  'resto/cart/UI_REACTED_TO_ORDER_SEND_SUCCESS';
const ORDER_SEND_ERROR_OCCURED = 'resto/cart/ORDER_SEND_ERROR_OCCURED';
const UI_REACTED_TO_ORDER_SEND_ERROR =
  'resto/cart/UI_REACTED_TO_ORDER_SEND_ERROR';

const initialState = {
  items: [],
  orderSending: false,
  orderSendSuccess: false,
  orderSendError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ITEM_ADD_TO_CART:
      const item = action.payload;
      const newItem = {
        title: item.title,
        price: item.price,
        url: item.url,
        id: item.id
      };

      return {
        ...state,
        items: [...state.items, newItem]
      };
    case ITEM_DELETE_FROM_CART:
      const idx = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === idx);
      return {
        ...state,
        items: [
          ...state.items.slice(0, itemIndex),
          ...state.items.slice(itemIndex + 1)
        ]
      };
    case ORDER_SENDING_STARTED:
      return {
        ...state,
        orderSending: true
      };
    case ORDER_SENT:
      return {
        ...state,
        items: [],
        orderSending: false,
        orderSendSuccess: true
      };
    case UI_REACTED_TO_ORDER_SEND_SUCCESS:
      return {
        ...state,
        orderSendSuccess: false
      };
    case ORDER_SEND_ERROR_OCCURED:
      return {
        ...state,
        orderSending: false,
        orderSendError: action.payload
      };
    case UI_REACTED_TO_ORDER_SEND_ERROR:
      return {
        ...state,
        orderSendError: null
      };
    default:
      return state;
  }
};

export const addToCart = (item) => {
  return {
    type: ITEM_ADD_TO_CART,
    payload: item
  };
};

export const deleteFromCart = (id) => {
  return {
    type: ITEM_DELETE_FROM_CART,
    payload: id
  };
};

export const orderSendingStarted = () => {
  return {
    type: ORDER_SENDING_STARTED
  };
};

export const orderSent = () => {
  return {
    type: ORDER_SENT
  };
};

export const uiReactedToOrderSendSuccess = () => {
  return {
    type: UI_REACTED_TO_ORDER_SEND_SUCCESS
  };
};

export const orderSendErrorOccured = (error) => {
  return {
    type: ORDER_SEND_ERROR_OCCURED,
    payload: error
  };
};

export const uiReactedToOrderSendError = () => {
  return {
    type: UI_REACTED_TO_ORDER_SEND_ERROR
  };
};
