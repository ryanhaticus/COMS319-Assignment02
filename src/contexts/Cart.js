import { createContext, useState } from "react";

export const items = require("../items.json");

export const CartContext = createContext({
  cart: [],
  name: "",
  streetAddress: "",
  city: "",
  state: "",
  zip: "",
  cardNumber: "",
  addToCart: (item) => {},
  removeFromCart: (item) => {},
  setName: (name) => {},
  setStreetAddress: (streetAddress) => {},
  setCity: (city) => {},
  setState: (state) => {},
  setZip: (zip) => {},
  setCardNumber: (cardNumber) => {},
  total: 0,
  subtotal: 0,
  taxes: 0,
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const taxes = 3;

  const clearCart = () => {
    setCart([]);
    setSubtotal(0);
    setTotal(0);
  };

  const addToCart = (item) => {
    const newCart = [...cart, item];

    const newSubtotal = newCart.reduce((acc, item) => acc + item.price, 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + taxes);

    setCart(newCart);
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const index = prevCart.lastIndexOf(item);

      if (index < 0) return prevCart;

      const newCart = [
        ...prevCart.slice(0, index),
        ...prevCart.slice(index + 1, prevCart.length),
      ];

      const newSubtotal = newCart.reduce((acc, item) => acc + item.price, 0);
      setSubtotal(newSubtotal);
      setTotal(newSubtotal + taxes);

      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        name,
        setName,
        streetAddress,
        setStreetAddress,
        city,
        setCity,
        state,
        setState,
        zip,
        setZip,
        cardNumber,
        setCardNumber,
        total,
        subtotal,
        taxes,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
