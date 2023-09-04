import Search from "../components/Search";
import Card from "../components/Card";

function Home( {searchValue,
  setSearchValue,
  onChangeSearchInput,
  items,
  onAddToCart,
  onAddToFavorites,
  cartItem,
loading}) {
  return (
    <div className="content">
        <div className="range-line">
          <h1>{searchValue ? `Search by "${searchValue}"` : `The whole range`}</h1>
          <Search setSearchValue={setSearchValue} searchValue={searchValue} onChangeSearchInput={onChangeSearchInput}/>
        </div>

        <div className="sneakers">
          {items
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item) => (
            <Card 
              key={item.id} 
              onPlus={(obj) => onAddToCart(obj)}
              onFavorite={(obj) => onAddToFavorites(obj)}
              added={cartItem.some(obj => Number(obj.id) === Number(item.id))}
              {...item}
              loading={loading}
            />
          ))}
        </div>
      </div>
  )
}

export default Home;