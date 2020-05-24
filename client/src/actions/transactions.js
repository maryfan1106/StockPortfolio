import axios from "axios";
import Cookies from "js-cookie";

export const getTransactions = () => {
  return axios
  .get(`/transactions/`, {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token')
        }
    })
  .then((res) => {
      return res.data.transactions;
  })
  .catch(err => {
    console.log(err)
    return ([]);
  });
};

export const makeTransaction = (transaction, cb, errCb) => {
  return axios
  .post(`/transactions/`, transaction, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('token')
    }
  })
  // if successfully made transaction, display success message
  .then(cb("success"))
  // return error to display as alert
  .catch(err => errCb({color:"danger", message:err.response.data.error}));
};
