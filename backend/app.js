const express = require('express');           // Importation du framework express
const bodyParser = require('body-parser');   // Importation de body-parser
const mongoose = require('mongoose');       // Importation du plugin Mongoose pour se connecter à la data base Mongo Db
const path = require("path");              // Permet de travailler avec les répertoires et chemin de fichier
const helmet = require("helmet");         // Importation de helmet pour sécuriser les apps express

// Déclaration des routes

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

// Connection à la base de données MongoDB

mongoose.connect('mongodb+srv://jimbob:EOXhXur9ZBTIhec2@cluster0.ac8ma.mongodb.net/sopeckoko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Appel d'express dans l'applicaion

const app = express();

// Methode pour modifier le systeme de securite cors

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Convertie les données en objet JSON 

app.use(bodyParser.json());

// Utilisation de 'helmet' pour protéger l'application de certaines vulnérabilités

app.use(helmet());

// routes api

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);



// gere les images 

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;