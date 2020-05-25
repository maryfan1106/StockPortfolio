import axios from "axios";
import Cookies from "js-cookie";

export const logIn = (user, cb, errCb) => {
  return axios
  .post(`/users/login`, user)
  // if successfully logged in, setAuth
  .then((res) => Cookies.set("token", res.data.token))
  .then(cb)
  // return error to display as alert
  .catch(err => errCb(err.response.data.error));
};

export const signUp = (user, cb, errCb) => {
  return axios
  .post(`/users/signup`, user)
  // if successfully logged in, setAuth
  .then((res) => Cookies.set("token", res.data.token))
  .then(cb)
  // return error to display as alert
  .catch(err => errCb(err.response.data.error));
};

export const getAccountInfo = () => {
  return axios
  .get(`/users/`, {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token')
        }
    })
  .then((res) => {
      return res.data;
  })
  .catch((err) => {
    console.log(err)
    // send default values
    return { accountbalance: err.response.data.accountbalance, portfolioValue: -1, stocks: [] };
  })
};
