import React from "react";

export default function Hero({ children }) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>Three. Words. Cool.</h1>
        <p>Inspirational sentence</p>
        {children}
      </div>
    </div>
  );
}
