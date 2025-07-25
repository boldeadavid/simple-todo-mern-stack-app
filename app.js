const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// === IMPORTĂM RUTELE ===
const crudRoutes = require('./routes/crud');
const authRoutes = require('./routes/auth'); // ✅ ruta pentru login

const app = express();

// === MIDDLEWARES ===
app.use(cors()); // ✅ permite cererile din alte origini
app.use(express.json()); // ✅ permite parsarea JSON-ului din body-ul cererilor

// === OPTIONAL: HEADERE CORS MANUAL ===
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// === REGISTRAREA RUTELOR ===
app.use('/post', crudRoutes);   // ex: /post/get, /post/delete/:id
app.use('/', authRoutes);       // ex: /login

// === CATCH-ALL pentru rute inexistente (404) ===
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// === ERROR HANDLER GLOBAL ===
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({
    message: error.message,
    data: error.data,
  });
});

// === CONECTARE LA MONGODB & PORNIREA SERVERULUI ===
mongoose
  .connect('mongodb+srv://boldeadavid:admin123@cluster0.ws5ejxn.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Conectat la MongoDB Atlas');
    app.listen(8080, () => {
      console.log('🚀 Serverul rulează pe http://localhost:8080');
    });
  })
  .catch((err) => {
    console.error('❌ Eroare la conectarea cu MongoDB:', err);
  });
