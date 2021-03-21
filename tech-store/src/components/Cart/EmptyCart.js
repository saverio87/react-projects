import React from "react";
import {Link} from 'react-router-dom';
import Cart from "../../pages/Cart";

export default function EmptyCart() {
  return (
  <section className="empty-cart section">
    <h2>empty cart...</h2>
    <Link to="/products" classname="btn btn-primary">fill it</Link>
  </section>);
}




