const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/AdminRouter');
const path = require('path');
const fichierRoutes = require('./routes/FichierRouter');
const actualiteRoutes = require('./routes/actualite');
const lienRoutes = require('./routes/lien');


const app = express();


mongoose.connect('mongodb+srv://nour:nourJANDOUBI12345.@cluster0.hsmtp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/documents', express.static(path.join(__dirname, 'documents')));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


const Admin = require('./models/admin');
const Fichier = require('./models/Fichier');


app.use('/api/auth', stuffRoutes);
app.use('/api/stuff', fichierRoutes);
app.use('/api/lien', lienRoutes);
app.use('/api/actualite', actualiteRoutes);


module.exports = app;

