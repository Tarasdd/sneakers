import Search from "../components/Search";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import CarouselCompound from "../carousel-compound/Carousel.jsx";
import React from "react";

function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  items,
  onAddToCart,
  onAddToFavorites,
  loading,
}) {
  return (
    <div className="content">
      <div className="range-line">
        <h1>
          {searchValue ? `Search by "${searchValue}"` : `The whole range`}
        </h1>
        <Search
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          onChangeSearchInput={onChangeSearchInput}
        />
      </div>

      <div className="sneakers">
        {loading ? (
          <div className="skeleton-list">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card
                key={item.id}
                onPlus={(obj) => onAddToCart(obj, console.log(obj))}
                onFavorite={(obj) => onAddToFavorites(obj)}
                // added={isItemAdded(item.id)}
                {...item}
                loading={loading}
              />
            ))
        )}
      </div>
      <div className="app__main-container">
        <CarouselCompound infinite>
          <CarouselCompound.Page>
            <img
              src="/img/sneakers/ebalo-1.jpg"
              alt="sneakers"
              className="slider-image"
            />
          </CarouselCompound.Page>
          <CarouselCompound.Page>
            <img
              src="/img/sneakers/ebalo-2.jpg"
              alt="sneakers"
              className="slider-image"
            />
          </CarouselCompound.Page>
          <CarouselCompound.Page>
            <img
              src="/img/sneakers/ebalo-3.jpg"
              alt="sneakers"
              className="slider-image"
            />
          </CarouselCompound.Page>
        </CarouselCompound>
      </div>
    </div>
  );
}

export default Home;
