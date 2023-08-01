import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Product {
  id: string;
  name: string;
  // Other product properties...
}

interface ProductChartProps {
  products: Product[];
}

const ProductChart: React.FC<ProductChartProps> = ({ products }) => {
  // Count the number of items per product
  const data = products.map((product) => ({
    name: product.name,
    count: 1, // You can update this based on the actual cart data
  }));

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default ProductChart;
