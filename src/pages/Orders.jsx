import React from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import AppContext from "../context";
import Skeleton from "../components/Skeleton";

function Orders(  ) {
  const { onAddToCart, onAddToFavorites } = React.useContext(AppContext)
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('https://64e9f30bbf99bdcc8e6722df.mockapi.io/orders')
      // console.log(data.map((obj) => obj.items).flat());
      // console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
      setLoading(false)
      } catch(err) {
        console.error('orders error', err);
      }
     }

    fetchData()
  }, [])

  return (
    
        <div className="content">
        <div className="range-line">
          <h1>My Orders</h1>
        </div>

        <div className="sneakers">
          {loading ? 
          <div className="skeleton-list">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div> 
          : 
          orders.map(item => (
            <Card 
              key={item.id} 
              // onPlus={(obj) => onAddToCart(obj)}
              // onFavorite={(obj) => onAddToFavorites(obj)}
              {...item}
            />
          ))}
        </div>
      </div>
      )
      
      
        // <div className="info-block">
        //   <Info
        //   title={'No marks :('}
        //   description={'You nothing add to marks'}  
        //   image={'/img/sad-imoji.png'} 
        // />
        // </div>
      
  
}

export default Orders;