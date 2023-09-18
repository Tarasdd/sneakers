import React from "react";
import { Select } from "../components/Select";
import AppContext from "../context";
import Search from "../components/Search";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";

function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  items,
  onAddToCart,
  onAddToFavorites,
  loading,
}) {
  const { setItems } = React.useContext(AppContext);
  const [selectedSort, setSelectedSort] = React.useState("");

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    setItems([...items].sort((a, b) => a[sort] - b[sort]));
  };

  return (
    <div className="content">
      <div className="range-line">
        <h1>
          {searchValue ? `Search by "${searchValue}"` : `The whole range`}
        </h1>

        <div style={{ display: "flex" }}>
          <div className="select">
            <Select
              value={selectedSort}
              onChange={sortPosts}
              defaultValue="Sort"
              options={[
                { value: "id", name: "from new to old" },
                { value: "price", name: "lower price" },
              ]}
            />
            <img src="/img/back-arrow.png" alt="Back arrow" />
          </div>

          <Search
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
          />
        </div>
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
                key={item._id}
                onPlus={() => onAddToCart(item)}
                onFavorite={() => onAddToFavorites(item)}
                // added={isItemAdded(item.id)}
                {...item}
                loading={loading}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default Home;
