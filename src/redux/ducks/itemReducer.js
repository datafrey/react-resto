const ITEM_LOADED = 'resto/item/ITEM_LOADED';
const ITEM_REQUESTED = 'resto/item/ITEM_REQUESTED';
const ITEM_LOADING_ERROR = 'resto/item/ITEM_LOADING_ERROR';
const ITEM_REINIT_STATE = 'resto/item/ITEM_REINIT_STATE';

const initialState = {
  item: null,
  itemLoading: true,
  itemLoadingError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ITEM_LOADED:
      return {
        ...state,
        item: action.payload,
        itemLoading: false
      };
    case ITEM_REQUESTED:
      return {
        ...state,
        itemLoading: true,
        itemLoadingError: null
      };
    case ITEM_LOADING_ERROR:
      return {
        ...state,
        itemLoading: false,
        itemLoadingError: action.payload
      };
    case ITEM_REINIT_STATE:
      return initialState;
    default:
      return state;
  }
};

export const itemLoaded = (item) => {
  return {
    type: ITEM_LOADED,
    payload: item
  };
};

export const itemRequested = () => {
  return {
    type: ITEM_REQUESTED
  };
};

export const itemLoadingErrorOccured = (error) => {
  return {
    type: ITEM_LOADING_ERROR,
    payload: error
  };
};

export const clearItemData = () => {
  return {
    type: ITEM_REINIT_STATE
  };
};
