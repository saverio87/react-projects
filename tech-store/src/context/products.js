// products context
import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/URL";
import {featuredProducts, flattenProducts} from '../utils/helpers'

export const ProductContext = React.createContext();

//Provider, Consumer, useContext()

export default function ProductProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => 
    {
      const featured = featuredProducts(flattenProducts(response.data));
      const products = flattenProducts(response.data);
      console.log(products, featured);
      setProducts(products);
      setFeatured(featured);
      setLoading(false);
    
    });
    
    return () => {};
  }, []);

  return (
    <ProductContext.Provider value={{ loading, products, featured }}>
      {children}
    </ProductContext.Provider>
  );
}
