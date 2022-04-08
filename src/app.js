require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

// App
const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes middlewares
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);

// DB
mongoose.connect(process.env.DATABASE);

// Server
app.listen(port, () => {
  console.info(`running on port ${port}`);
  console.info(`process ${JSON.stringify(process.env.PORT)}`);
});
