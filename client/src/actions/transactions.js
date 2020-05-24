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
  });
};
