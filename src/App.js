import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";
import Pagination from "./components/Pagination";

function App() {
  const [openOverlay, setOpenOverlay] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItem, setCartItem] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [amount, setAmount] = React.useState(0);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(4);
  const [totalPages, setTotalPages] = React.useState(1);

  const onAddToCart = (obj) => {
    if (cartItem.find((item) => item._id === obj._id)) {
      console.log(obj._id);
      axios.delete(`http://localhost:3001/deleteFromCart/${obj._id}`);
      setCartItem(cartItem.filter((item) => item._id !== obj._id));
    } else {
      axios.post("http://localhost:3001/addToCart", obj);
      setCartItem([...cartItem, obj]);
    }
  };

  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj._id === obj._id)) {
        axios.delete(`http://localhost:3001/deleteFromFavorites/${obj._id}`);
        setFavorites((prev) => prev.filter((item) => item._id !== obj._id));
      } else {
        axios.post("http://localhost:3001/addToFavorites", obj);
        setFavorites((prev) => [...prev, obj]);
        console.log(favorites);
      }
    } catch (err) {
      alert("Cant add to favorites :<");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/deleteFromCart/${id}`);
    setCartItem((prev) => prev.filter((item) => item._id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  // React.useEffect(() => {
  //   fetch('https://64e8fb1e99cf45b15fe06193.mockapi.io/items').then(res => {
  //     return res.json()
  //   }).then(json => {
  //     setItems(json);
  //   })
  // }, [])

  const isItemAdded = (id) => {
    return cartItem.some((obj) => obj._id === id);
  };

  const isItemFavorite = (id) => {
    return favorites.some((obj) => obj._id === id);
  };

  const handlePerPage = (newPage) => {
    setCurrentPage(newPage);
  };

  React.useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get(
        "http://localhost:3001/getProducts",
        {
          params: {
            limit: itemsPerPage,
            page: currentPage,
          },
        }
      );

      const cartResponse = await axios.get("http://localhost:3001/getCart");
      const favoriteResponse = await axios.get(
        "http://localhost:3001/getFavorites"
      );
      const allProductsResponse = await axios.get(
        "http://localhost:3001/getAllProducts"
      );
      setTotalPages(Math.ceil(allProductsResponse.data.length / itemsPerPage));
      setCartItem(cartResponse.data);
      console.log(cartItem);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);

      setLoading(false);
    }

    fetchData();
  }, [currentPage, itemsPerPage]);

  return (
    <AppContext.Provider
      value={{
        items,
        favorites,
        cartItem,
        amount,
        setItems,
        setAmount,
        isItemAdded,
        setOpenOverlay,
        setCartItem,
        isItemFavorite,
      }}
    >
      <div className="wrapper">
        {/* DRAWER */}
        {openOverlay && (
          <Drawer
            onRemove={onRemoveItem}
            items={cartItem}
            onClose={() => setOpenOverlay(false)}
          />
        )}

        {/* HEADER */}
        <Header amount={amount} onClickCart={() => setOpenOverlay(true)} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePerPage}
        />

        {/* CONTENT */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItem={cartItem}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                items={items}
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
                loading={loading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                // onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
              />
            }
          ></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
