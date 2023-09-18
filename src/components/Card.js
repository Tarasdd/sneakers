import React from "react";
import Skeleton from "./Skeleton";

import AppContext from "../context";

function Card({
  _id,
  imgUrl,
  title,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  loading,
}) {
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const { isItemAdded, isItemFavorite } = React.useContext(AppContext);

  const onClickPlus = () => {
    onPlus({ _id, imgUrl, title, price });
  };

  const onClickFavorite = () => {
    onFavorite({ _id, imgUrl, title, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {onFavorite && (
            <div onClick={onClickFavorite} className="favorite">
              <img
                src={
                  isItemFavorite(_id)
                    ? "/img/heart-like.svg"
                    : "/img/heart-unlike.svg"
                }
                alt="Unlike"
              />
            </div>
          )}
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

            {onPlus && (
              <img
                className="plus"
                onClick={onClickPlus}
                src={
                  isItemAdded(_id) ? "/img/success.svg" : "/img/unsuccess.svg"
                }
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
