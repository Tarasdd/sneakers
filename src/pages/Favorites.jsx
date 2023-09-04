import Card from "../components/Card";

function Favorites( {items, onAddToCart,
  onAddToFavorites} ) {
  return (
    <div className="content">
        <div className="range-line">
          <h1>Favorites</h1>
        </div>

        <div className="sneakers">
          {items.map(item => (
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
}

export default Favorites;