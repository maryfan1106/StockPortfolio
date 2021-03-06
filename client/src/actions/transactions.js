import axios from "axios";
import Cookies from "js-cookie";

export const getTransactions = () => {
  return axios
  .get(`/transactionsapi/`, {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token')
        }
    })
  .then((res) => {
      return res.data.transactions;
  })
  .catch(err => {
    return ([]);
  });
};

export const makeTransaction = (transaction, cb, errCb) => {
  return axios
  .post(`/transactionsapi/`, transaction, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('token')
    }
  })
  // if successfully made transaction, display success message
  .then((res) => {
    cb(res.data.transaction);
  })
  // return error to display as alert
  .catch(err => errCb(err.response.data.error));
};
