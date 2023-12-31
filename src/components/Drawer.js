import React from "react";
import Info from "./Info";
import AppContext from "../context";
import axios from "axios";

function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItem, setCartItem, openOverlay } = React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const totalAmount = () => {
    return cartItem.reduce((sum, obj) => obj.price + sum, 0);
  };

  const taxAmount = () => {
    const total = totalAmount();
    const tax = Math.round((total * 5) / 100);
    return tax;
  };

  const onClickOrderComplete = async () => {
    try {
      setIsLoading(true);
      const idOfOrder = await axios.post("http://localhost:3001/addToOrders", {
        items: cartItem,
      });

      // await axios.put('https://64e8fb1e99cf45b15fe06193.mockapi.io/cart', [])
      setOrderId(idOfOrder.data);
      setIsOrderComplete(true);
      setCartItem([]);
      await axios.delete("http://localhost:3001/deleteCart");

      // console.log(isOrderComplete);
    } catch (err) {
      console.error(err.response);
      alert("Cant create order ;<");
    }
    setIsLoading(false);
  };

  return (
    <div className={`overlay ${openOverlay ? "overlayVisible" : ""}`}>
      <div className="drawer">
        <h2>
          Basket{" "}
          <img
            onClick={onClose}
            className="remove-btn"
            src="/img/btn-remove-hover.svg"
            alt="remove"
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj) => (
                <div>
                  <div key={obj._id} className="cart-item">
                    <img
                      className="block-sneakers"
                      width={80}
                      height={70}
                      src={`${obj.imgUrl}`}
                      alt="img"
                    />

                    <div className="cart-description">
                      <p>{obj.title}</p>
                      <b>{obj.price} $</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj._id)}
                      className="remove-btn"
                      src="/img/btn-remove-hover.svg"
                      alt="remove"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="line">
                  <span>Total:</span>
                  <div></div>
                  <b>{totalAmount()} $</b>
                </li>
                <li className="line">
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>{taxAmount()} $</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrderComplete}
                className="greenButton"
              >
                checkout <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Order complete" : "Basket empty"}
            description={
              isOrderComplete
                ? `Your order #${orderId} will be delivered to courier soon`
                : "please, add at least one pair of sneakers"
            }
            image={isOrderComplete ? "/img/list.png" : "/img/basket.png"}
          />
          // <div className="cart-empty">
          //   <img width={120} height={120} src="/img/basket.png" alt="basket"/>
          //   <h2>Empty basket</h2>
          //   <p>add sneakers to order</p>
          //   <button onClick={onClose} className="greenButton">
          //     Come back
          //   </button>
          // </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
