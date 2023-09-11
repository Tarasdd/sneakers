import React, { useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../context";

function SessionEndComponent() {
  const { cartItem } = useContext(AppContext);

  useEffect(() => {
    const handleSessionEnd = async () => {
      try {
        // You can use Promise.all to send all the requests concurrently
        await Promise.all(
          cartItem.map((product) =>
            axios.post(
              "https://64e8fb1e99cf45b15fe06193.mockapi.io/cart",
              product
            )
          )
        );
        console.log(cartItem);
        localStorage.setItem("lol", JSON.stringify(cartItem));
        console.log("Data sent to the database successfully.");
      } catch (error) {
        console.error("Error sending data to the database:", error);
      }
    };

    // Add an event listener for beforeunload
    window.addEventListener("beforeunload", handleSessionEnd);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleSessionEnd);
    };
  }, [cartItem]);

  return;
}

export default SessionEndComponent;
