// import api from '../../utils/api';
import axios from 'axios';
import * as actionTypes from './types';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('api/auth');
    // const res = await api.get('/auth');

    dispatch({
      type: actionTypes.USER_LOADED,
      payload: res.data,
    });
    // dispatch(loadUser());
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
  // const body = { name, email, password };
  try {
    const res = await axios.post('api/users', body, config);
    // const res = await api.post('/users', body);
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
  // const body = { email, password };
  try {
    const res = await axios.post('api/auth', body, config);
    // const res = await api.post('/auth', body);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
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
    type: actionTypes.CLEAR_PROFILE,
  });
  dispatch({
    type: actionTypes.LOGOUT,
  });
};
