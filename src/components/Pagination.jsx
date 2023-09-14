import React from "react";
import axios from "axios";
import AppContext from "../context";
import { useState } from "react";
import { useEffect } from "react";

export function Pagination () {
  const {} = React.useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    try {
      const  fetchData = async () => {
        const itemsResponse = await axios.get('https://64e8fb1e99cf45b15fe06193.mockapi.io/items', { params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      })
      setItems(response.fetchData)  
    }
  } catch(err) {
    console.error(err)
  }

  fetchData();

}, [currentPage, itemsPerPage])

  return ()
}