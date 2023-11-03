
import React from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import productsData from "./components/productsData";

function App() {
  return (
    <div className="App">
      <h1>Products List</h1>
      <ProductList products={productsData} />
    </div>
  );
}

export default App;
