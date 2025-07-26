require("dotenv").config();


const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json'); // You need to add this file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID || 'e-commerce-b8f01'
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const checkoutRoutes = require('./routes/checkout');
app.use('/api/checkout', checkoutRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

