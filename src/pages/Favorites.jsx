import React from "react";
import Card from "../components/Card";
import Info from "../components/Info";
import AppContext from "../context";

function Favorites( {onAddToFavorites} ) {
  const {favorites} = React.useContext(AppContext)

  console.log(favorites);

  return (
      favorites.length > 0 ? (
        <div className="content">
        <div className="range-line">
          <h1>Favorites</h1>
        </div>

        <div className="sneakers">
          {favorites.map(item => (
            <Card  
            key={item.id}
            favorited={true}
            onFavorite={onAddToFavorites}
            {...item}
            />
          ))}
        </div>
      </div>
      ) 
      :
      (
        <Info />
      )
      // <div className="content">
      //   <div className="range-line">
      //     <h1>Favorites</h1>
      //   </div>

      //   <div className="sneakers">
      //     {favorites.map(item => (
      //       <Card  
      //       key={item.id}
      //       favorited={true}
      //       onFavorite={onAddToFavorites}
      //       {...item}
      //       />
      //     ))}
      //   </div>
      // </div>
  )
}

export default Favorites;