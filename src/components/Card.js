import React from "react";
import Skeleton from "./Skeleton";

import AppContext from "../context";

function Card({
  id,
  imgUrl,
  title,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  loading,
}) {
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const { isItemAdded, amount, setAmount } = React.useContext(AppContext);

  const onClickPlus = () => {
    if (isItemAdded(id)) {
      onPlus({ id, imgUrl, title, price });
      setAmount(amount - price);
    } else {
      onPlus({ id, imgUrl, title, price });
      setAmount(amount + price);
    }
  };

  const onClickFavorite = () => {
    onFavorite({ id, imgUrl, title, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div onClick={onClickFavorite} className="favorite">
            <img
              src={isFavorite ? "/img/heart-like.svg" : "/img/heart-unlike.svg"}
              alt="Unlike"
            />
          </div>
          <img
            className="img-sneakers"
            width={133}
            height={112}
            src={imgUrl}
            alt="Sneakers"
          />
          <p>{title}</p>
          <div className="inner-card">
            <div className="price-card">
              <span>Price:</span>
              <b>{price} $</b>
            </div>

            <img
              className="plus"
              onClick={onClickPlus}
              src={isItemAdded(id) ? "/img/success.svg" : "/img/unsuccess.svg"}
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
