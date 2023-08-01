"use client"

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Link from 'next/link';

const API_BASE_URL = 'https://dummyjson.com';

interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  category: string;
}

interface Cart {
  id: string;
  // Other cart properties...
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceRangeFilter, setPriceRangeFilter] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Number of products to display per page


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex);


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredProducts.length / itemsPerPage)));
  };


  useEffect(() => {
    const fetchProductsAndCarts = async () => {
      try {
        const [productsData, cartsData] = await Promise.all([
          axios.get(`${API_BASE_URL}/products`),
          axios.get(`${API_BASE_URL}/carts`),
        ]);

        setProducts(productsData.data.products);
        setCarts(cartsData.data.carts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchProductsAndCarts();
  }, []);

  // Filter products whenever filter input values change
  useEffect(() => {
    const filtered = products.filter((product) => {
      const brandMatch = !brandFilter || product.brand.toLowerCase().includes(brandFilter.toLowerCase());
      const categoryMatch = !categoryFilter || product.category.toLowerCase().includes(categoryFilter.toLowerCase());
      const priceMatch = !priceRangeFilter || checkPriceRange(product.price);
      return brandMatch && categoryMatch && priceMatch;
    });
    setFilteredProducts(filtered);
  }, [products, brandFilter, categoryFilter, priceRangeFilter]);

  const checkPriceRange = (price: number) => {
    if (!priceRangeFilter) return true;

    const [minPrice, maxPrice] = priceRangeFilter.split('-').map(Number);
    return price >= minPrice && price <= maxPrice;
  };


  const handleFilterReset = () => {
    setBrandFilter(null);
    setCategoryFilter(null);
    setPriceRangeFilter(null);
  };

  return (
    <div  style={{margin:'2rem'}}>
      <div>
        <h2>Filter Products</h2>
        <label>
          Brand:
          <input type="text" value={brandFilter || ''} onChange={(e) => setBrandFilter(e.target.value)} />
        </label>
        <br></br>
        <label>
          Category:
          <input type="text" value={categoryFilter || ''} onChange={(e) => setCategoryFilter(e.target.value)} />
        </label>
        <br></br>
        <label>
          Price Range:
          <select value={priceRangeFilter || ''} onChange={(e) => setPriceRangeFilter(e.target.value)}>
            <option value="">All</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
          </select>
        </label>
        <br></br>
        <br></br>
        <button onClick={handleFilterReset}>Reset</button>
      </div>
      <div className='product'>
        <h1>Products</h1>
        <table style={{margin:'1rem', color:'dark-blue', border:'1px solid'}} >
          <thead >
            <tr>
              <th style={{border:'1px solid'}}>ID</th>
              <th style={{border:'1px solid'}}>Name</th>
              <th style={{border:'1px solid'}}>Brand</th>
              <th style={{border:'1px solid'}}>Price</th>
              <th style={{border:'1px solid'}}>Category</th>
            </tr>
          </thead>
          <tbody>
            {productsToShow.map((product) => (
              <tr key={product.id}>
                <td style={{border:'1px solid'}}>{product.id}</td>
                <td style={{border:'1px solid'}}>{product.title}</td>
                <td style={{border:'1px solid'}}>{product.brand}</td>
                <td style={{border:'1px solid'}}>{product.price}</td>
                <td style={{border:'1px solid'}}>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br></br><br></br>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}>
          Next
        </button>
      </div>
      <div className='cart'>
        <h1>Carts</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {/* Other cart header columns */}
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <tr key={cart.id}>
                <Link href={`/carts/${cart.id}`} passHref>
                  {cart.id}
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Link href={`/charts`} passHref>
          go to Chart
        </Link>
      </div>

    </div>
  );
};

export default HomePage;
function setCurrentPage(arg0: (prevPage: any) => number) {
  throw new Error('Function not implemented.');
}

