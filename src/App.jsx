import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [updatingProductId, setUpdatingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post('http://localhost:5000/api/products', { name, price });
      setName('');
      setPrice('');
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (id, updatedProductData) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, updatedProductData);
      setUpdatingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id, updatedProductData) => {
    setUpdatingProductId(id);
    updateProduct(id, updatedProductData);
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {updatingProductId === product._id ? (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
                <button onClick={() => handleUpdate(product._id, { name, price })}>Update</button>
              </div>
            ) : (
              <div>
                {product.name} - ${product.price}
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
                <button onClick={() => setUpdatingProductId(product._id)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
