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
    if (cartItem.find((item) => item.id === obj.id)) {
      // axios.delete(`https://64e8fb1e99cf45b15fe06193.mockapi.io/cart/${obj.id}`);
      setCartItem(
        cartItem.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://64e8fb1e99cf45b15fe06193.mockapi.io/cart", obj);
      setCartItem([...cartItem, obj]);
    }
  };

  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://64e9f30bbf99bdcc8e6722df.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://64e9f30bbf99bdcc8e6722df.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("Cant add to favorites :<");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64e8fb1e99cf45b15fe06193.mockapi.io/cart/${id}`);
    setCartItem((prev) => prev.filter((item) => item.id !== id));
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
    return cartItem.some((obj) => Number(obj.id) === Number(id));
  };

  const handlePerPage = (newPage) => {
    setCurrentPage(newPage);
  }

  React.useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get(
        "https://64e8fb1e99cf45b15fe06193.mockapi.io/items", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        }
      );
      const cartResponse = await axios.get(
        "https://64e8fb1e99cf45b15fe06193.mockapi.io/cart"
      );
      const favoriteResponse = await axios.get(
        "https://64e9f30bbf99bdcc8e6722df.mockapi.io/favorites"
      );

      setTotalPages(Math.ceil(itemsResponse.data.length / itemsPerPage));

      console.log(Math.ceil(itemsResponse.data.length / itemsPerPage));
      console.log(itemsResponse.data.length);
      console.log(itemsPerPage);

      const data = await axios.get("http://localhost:3001/getCart");
      console.log(data);

      setCartItem(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);

      setLoading(false);
    }

    fetchData();

    // axios.get('https://64e8fb1e99cf45b15fe06193.mockapi.io/items').then((res) => {
    // setItems(res.data)
    // });

    // axios.get('https://64e8fb1e99cf45b15fe06193.mockapi.io/cart').then((res) => {
    //   setCartItem(res.data)
    // });

    // axios.get('https://64e9f30bbf99bdcc8e6722df.mockapi.io/favorites').then(res => {
    //   setFavorites(res.data)
    // });
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
          <Route
            path="/orders"
            element={
              <Orders
              />
            }
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
