export const SET_AUTH = 'SET_AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH';

export const authReducer = ( state , action ) => {
  switch (action.type) {
    case SET_AUTH:
        window.localStorage.setItem('auth', true);
        return { authenticated: true };
    case REMOVE_AUTH:
        window.localStorage.removeItem('auth');
        return { authenticated: false };
    default:
        return state;
  }
};