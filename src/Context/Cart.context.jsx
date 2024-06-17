import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);

  async function getCartData() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log({ error });
      if (error.response.statusText === "Not Found") {
        console.log(error.response);
        setCartInfo([]);
      }
    }
  }

  async function addToCart({ id }) {
    let loadingToastId;
    try {
      loadingToastId = toast.loading("Waiting...");

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        data: {
          productId: id,
        },
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToastId);
        toast.success(data.message);
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartCount({ id, count }) {
    let loadingToastId;
    try {
      loadingToastId = toast.loading("waiting...");
      const options = {
        method: "PUT",
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        data: {
          count,
        },
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToastId);
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCartItem({ id }) {
    let loadingToastId;
    try {
      loadingToastId = toast.loading("waiting...");
      const options = {
        method: "DELETE",
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.dismiss(loadingToastId);
        toast.success("Deleted Successfully");
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function clearUserCart() {
    let loadingToastId;
    try {
      loadingToastId = toast.loading("waiting...");
      const options = {
        method: "DELETE",
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.message === "success") {
        toast.dismiss(loadingToastId);
        toast.success("Cart has been cleared Successfully");
        setCartInfo([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartInfo,
        setCartInfo,
        getCartData,
        addToCart,
        updateCartCount,
        deleteCartItem,
        clearUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
