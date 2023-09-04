import React from "react";
import Skeleton from "./Skeleton";

function Card( {id, imgUrl, title, price, onPlus, onFavorite, favorited = false, added = false, loading} ) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus( {id, imgUrl, title, price} )
    setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    onFavorite( {id, imgUrl, title, price} )
    setIsFavorite(!isFavorite)
  }

  return (
    <div className='card'>
      {
        loading ? (<Skeleton />) 
        : 
        (<>
          <div onClick={onClickFavorite} className="favorite">
              <img src={isFavorite ? "/img/heart-like.svg" : "/img/heart-unlike.svg"} alt="Unlike"/>
            </div>
            <img className="img-sneakers" width={133} height={112} src={imgUrl} alt="Sneakers" />
            <p>{title}</p>
            <div className="inner-card">
              <div className="price-card">
                <span>Price:</span>
                <b>{price} $</b>
              </div>

              <img className="plus" onClick={onClickPlus} src={isAdded ? "/img/success.svg" : "/img/unsuccess.svg"} alt="plus"/>

            </div>
        </>)
      }
    </div>
  )
}

export default Card;
