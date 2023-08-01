

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
const BASE_URL = 'https://dummyjson.com';

interface Product {
  cartId: number;
  id: number;
  name: string;
  title: string;
  brand: string;
  price: number;
  category: string;

  // Add other properties as needed
}

const CartDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await axios.get(`https://dummyjson.com/carts/${id}`)
        await setCartProducts(response.data.product);
        // this.setState({ product: res.data })
        console.log(cartProducts)
        console.log(response.data.products)
        console.log(response.data)

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts()

  }, [id]);

  return (
    <div>
      {/* {cartProducts.length > 0 ? ( */}
      <div>
        <h1>Cart ID: {id}</h1>
        <h2>Products in Cart:</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )} */}
    </div>
  );
};

export default CartDetailsPage;
