import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {ProductContext} from '../context/products';
// import {CartContext} from '../context/cart';
import {useHistory} from 'react-router-dom';
import Loading from "../components/Loading";
import { CartContext } from "../context/cart";
// useParams is for passing props

export default function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const {products} = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);
  const product = products.find(item => item.id === parseInt(id)); 
  
  // we are using parseInt because the param 'id' is
  // returned as a string

  if (products.length === 0 ) {
    return <Loading/>
  } else {
    const {image, title, price, description} = product;
    return (
      <section className="single-product">
        <img src={image} alt={title}/>
        <article>
    <h1>{title}</h1>
    <h2>${price}</h2>
          <p>{description}</p>
          <button className="btn btn-primary btn-block" onClick={()=> {
            addToCart(product);
            // add to cart
            history.push('/cart')
          }}>add to cart</button>
        </article>
      </section>
    )
  }
  // we are doing this because it might take a while to fetch
  // the data from the API
  return (
    <>
      <h1>hello from product details page.</h1>
      <h2>The current product is {product.id}</h2>
    </>
  );
}
