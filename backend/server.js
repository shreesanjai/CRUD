// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Product from './models/Product.js';
import cors from 'cors';

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern_demo')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// GET route to fetch product details
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST route to add a product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a product by ID
app.put('/api/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(id, { name, price }, { new: true });
      res.json(updatedProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // Delete a product by ID
app.delete('/api/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.json({ msg: 'Product deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
