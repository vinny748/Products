import React, { useState } from "react";
import Product from "./Product";
import "./Product.css";

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriterion, setSortCriterion] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceFilter, setPriceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categorySearch, setCategorySearch] = useState("");
  const productsPerPage = 6;

  //  price range filters
  const priceRanges = {
    "0-500": { min: 0, max: 500 },
    "500-1000": { min: 500, max: 1000 },
    "1000-2000": { min: 1000, max: 2000 },
    "2000-3000": { min: 2000, max: 3000 },
  };

  // Function to filter the products
  const filterProducts = (product) => {
    const isPriceInRange =
      priceFilter === "all" ||
      (product.price >= priceRanges[priceFilter].min &&
        product.price <= priceRanges[priceFilter].max);
    const isCategoryMatch =
      categoryFilter === "all" || product.category === categoryFilter;
    const isCategorySearchMatch =
      categorySearch === "" ||
      product.category.toLowerCase().includes(categorySearch.toLowerCase());
    return isPriceInRange && isCategoryMatch && isCategorySearchMatch;
  };

  const filteredProducts = products.filter(filterProducts).sort((a, b) => {
    if (sortCriterion === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortCriterion === "name") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const changeSortCriterion = (criterion) => {
    if (criterion !== sortCriterion) {
      setSortCriterion(criterion);
      setSortOrder("asc"); // Reset sort order when changing the criterion
    } else {
      toggleSortOrder(); // Toggle sort order if the same criterion is clicked again
    }
  };

  return (
    <div>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Filter by Category"
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Beauty">Beauty</option>
          <option value="Furniture">Furniture</option>
          <option value="Mobiles">Mobiles</option>
          {/* Add more category options as needed */}
        </select>
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="0-500">0-500 Rs</option>
          <option value="500-1000">500-1000 Rs</option>
          <option value="1000-2000">1000-2000 Rs</option>
          <option value="2000-3000">2000-3000 Rs</option>
        </select>
      </div>
      <div className="sort-bar">
        <button onClick={() => changeSortCriterion("price")}>
          Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
        </button>
        <button onClick={() => changeSortCriterion("name")}>
          Sort by Name ({sortOrder === "asc" ? "A to Z" : "Z to A"})
        </button>
      </div>
      <div className="product-list">
        {currentProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
