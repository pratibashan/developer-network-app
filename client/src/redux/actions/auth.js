import axios from 'axios';
import * as actionTypes from './types';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  console.log('loadUser...');
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    console.log('api/try');
    const res = await axios.get('/api/auth');
    console.log(res.data);
    dispatch({
      type: actionTypes.USER_LOADED,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: actionTypes.AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionTypes.REGISTER_FAIL,
    });
  }
};
//Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionTypes.LOGIN_FAIL,
    });
  }
};
//Logout //Clear Profile
export const logout = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT,
  });
};
