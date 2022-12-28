import authAPI from '../../api/authAPI';
import { getPoints, clearPoint } from './table';
import { clearCurrent } from './points';

const SET_LOADING = 'SET_LOADING';
const SET_SERVER_ERROR_MESSAGE = 'SET_SERVER_ERROR_MESSAGE';
const SET_LOGGED_USER = 'SET_LOGGED_USER';

const initialState = {
  isLoading: false,
  loggedUser: '',
  serverErrorMessage: ''
};

export default function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign(
        {},
        state,
        {
          isLoading: action.value
        }
      );
    case SET_SERVER_ERROR_MESSAGE:
      return Object.assign(
        {},
        state,
        {
          serverErrorMessage: action.value
        }
      );
    case SET_LOGGED_USER:
      return Object.assign(
        {},
        state,
        {
          loggedUser: action.value
        }
      );
    default:
      return state;
  }
}

export function setLoading(value) {
  return { type: SET_LOADING, value };
}

export function setServerErrorMessage(value) {
  return { type: SET_SERVER_ERROR_MESSAGE, value };
}
export function setLoggedUser(value) {
  return { type: SET_LOGGED_USER, value };
}

export const initializeAuth = () => (dispatch) => {
  let currentUser = JSON.parse(localStorage.getItem('tad'));
  if (currentUser !== null) {
    dispatch(setLoggedUser(currentUser.username));
    dispatch(getPoints());
  }
}

export const login = (username, password) => (dispatch) => {
  dispatch(setLoading(true));
  authAPI.login(username, password)
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem('tad', JSON.stringify(response.data.token));
        dispatch(setLoggedUser(response.data.username));
        dispatch(getPoints());
      } else {
        alert(`Unexpected response ${response.status} from server!`);
      }
      dispatch(setLoading(false));
    })
    .catch(error => {
      if (error.response.status === 400) {
        dispatch(setServerErrorMessage(error.response.data));
        setTimeout(function(){
          dispatch(setServerErrorMessage(""))
        }, 3000)
      } else {
        alert(`Unexpected response ${error.response.status} from server!`);
      }
      dispatch(setLoading(false));
    });
}

export const register = (username, password) => (dispatch) => {
  dispatch(setLoading(true));
  authAPI.register(username, password)
    .then(response => {

      if (response.status === 200) {
        localStorage.setItem('tad', JSON.stringify(response.data.token));
        dispatch(login(username, password));
      } else {
        alert(`Unexpected response ${response.status} from server!`);
      }
      dispatch(setLoading(false));
    })
    .catch(error => {
      if (error.response.status === 400) {
        dispatch(setServerErrorMessage(error.response.data));
        setTimeout(function(){
          dispatch(setServerErrorMessage(""))
        }, 3000)
      } else {
        alert(`Unexpected response ${error.response.status} from server!`);
      }
      dispatch(setLoading(false));
    });
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('tad');
  dispatch(setLoggedUser(''));
  dispatch(clearCurrent());
  dispatch(clearPoint())
}