import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = err => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = orderData => dispatch => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', orderData)
    .then(res => {
      console.log(res.data);
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    })
    .catch(err => dispatch(purchaseBurgerFail(err)));
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
