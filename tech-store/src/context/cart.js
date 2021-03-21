// cart context

import React, {createContext, useState, useEffect} from 'react';
import LocalCart from '../utils/localCart';

const CartContext = createContext();

function getCartFromLocalStorage() {
  return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}


function CartProvider({children}) {
  const [cart, setCart] = useState(getCartFromLocalStorage());
  const [total, setTotal] = useState(0);
  const [cartItems,setCartItems] = useState(0);

  useEffect(() => {
    //local storage
    localStorage.setItem('cart',JSON.stringify(cart));
    // cart items

    let newCartItems = cart.reduce((total,cartItem) => {
      return total += cartItem.amount
    },0);
    setCartItems(newCartItems);
    // cart total
    let newTotal = cart.reduce((total,cartItem)=> {
      return total += cartItem.amount * cartItem.price;
    },0);

    newTotal = parseFloat(newTotal.toFixed(2));

    setTotal(newTotal);
  }, [cart])

  // remove item
  const removeItem = id => {
    setCart([...cart].filter(item => item.id !==id));
  }
  // increase amount
  const increaseAmount = id => {
    
    const newCart = [...cart].map(item=> {
      if (item.id === id) {
        return {
          ...item,
          amount: item.amount + 1
        }
      }
      return {...item};
    });
    setCart(newCart);
  }
  // decrease amount
  const decreaseAmount = (id,amount) => {
    if(amount === 1) {
      removeItem(id);
      return;
    } else {

      const newCart = [...cart].map(item=> {
        if (item.id === id) {
          return {
            ...item,
            amount: item.amount - 1
          }
        }
        return {...item};
      });
      setCart(newCart);

    }
  }
  // add to cart
  const addToCart = product => {
    const {id,image,title,price} = product;
    const item = [...cart].find(item => item.id === id);
    if(item) {
      // if you can find the item in the cart, just increase the amount
      increaseAmount(id);
      return;
    }
    else {
      // if you can't, add a new Item to the cart
      const newItem = {id, image, title, price, amount: 1};
      const newCart = [...cart,newItem];
      setCart(newCart);
    }
  }
  // clear cart
  const clearCart = () => {
      setCart([])
  }



  return <CartContext.Provider value={{cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, addToCart, clearCart}}>{children}</CartContext.Provider>
}

export {CartContext, CartProvider};