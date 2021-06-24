const MENU_LOADED = 'resto/menu/MENU_LOADED';
const MENU_REQUESTED = 'resto/menu/MENU_REQUESTED';
const MENU_LOADING_ERROR = 'resto/menu/MENU_LOADING_ERROR';

const initialState = {
  menu: [],
  menuLoading: true,
  menuLoadingError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_LOADED:
      return {
        ...state,
        menu: action.payload,
        menuLoading: false
      };
    case MENU_REQUESTED:
      return {
        ...state,
        menuLoading: true,
        menuLoadingError: null
      };
    case MENU_LOADING_ERROR:
      return {
        ...state,
        menuLoading: false,
        menuLoadingError: action.payload
      };
    default:
      return state;
  }
};

export const menuLoaded = (menu) => {
  return {
    type: MENU_LOADED,
    payload: menu
  };
};

export const menuRequested = () => {
  return {
    type: MENU_REQUESTED
  };
};

export const menuLoadingErrorOccured = (error) => {
  return {
    type: MENU_LOADING_ERROR,
    payload: error
  };
};
