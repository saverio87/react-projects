import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/Products/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Hero>
        <Link to="/products" className="btn btn-primary btn-hero">
          Check out our shit
        </Link>
      </Hero>
      <FeaturedProducts />
    </>
  );
}
