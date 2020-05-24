export const SET_AUTH = 'SET_AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH';

const setAuth = (state) => {
  return { authenticated: true };
};

const removeAuth = (state) => {
    return { authenticated: false };
  };

export const authReducer = ( state , action ) => {
  switch (action.type) {
    case SET_AUTH:
      return setAuth( state );
    case REMOVE_AUTH:
      return removeAuth( state );
    default:
      return state;
  }
};