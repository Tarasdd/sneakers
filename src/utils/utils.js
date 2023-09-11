"use strict";

const getPriceOfCart = (data) =>
  data.reduce((total, product) => total + product.price, 0);

export default getPriceOfCart;
