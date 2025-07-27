const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Mock database - replace with your actual database
let products = [
  {
    id: 1,
    name: 'Sample Product',
    description: 'This is a sample product',
    price: 29.99,
    category: 'electronics',
    stock: 100,
    image: '/images/sample-product.jpg',
    status: 'active',
    createdAt: new Date()
  }
];

let orders = [];
let productIdCounter = 2;

// Get admin stats
router.get('/stats', authenticateToken, requireAdmin, (req, res) => {
  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter(order => order.status === 'pending').length
  };
  res.json(stats);
});

// Get all products
router.get('/products', authenticateToken, requireAdmin, (req, res) => {
  res.json(products);
});

// Add new product
router.post('/products', authenticateToken, requireAdmin, (req, res) => {
  const newProduct = {
    id: productIdCounter++,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product
router.put('/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products[productIndex] = {
    ...products[productIndex],
    ...req.body,
    updatedAt: new Date()
  };

  res.json(products[productIndex]);
});

// Delete product
router.delete('/products/:id', authenticateToken, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Upload product image
router.post('/upload-image', authenticateToken, requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const imageUrl = `/uploads/products/${req.file.filename}`;
  res.json({ imageUrl });
});

// Get all orders
router.get('/orders', authenticateToken, requireAdmin, (req, res) => {
  res.json(orders);
});

// Update order status
router.put('/orders/:id/status', authenticateToken, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  
  const orderIndex = orders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date();
  
  res.json(orders[orderIndex]);
});

module.exports = router;