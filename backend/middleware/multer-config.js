const multer = require('multer'); // Module multer pour gérer les fichiers entrants dans les requêtes HTTP

const MIME_TYPES = {  // On utilise MIME pour définir le format des images
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
  };
  
  // logique pour les stockage telechargements de fichiers et modification d'image avec multer
  
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "images");
    },
    filename: (req, file, callback) => {
    //  const name = file.originalname.split(" ").join("_");
      const extension = MIME_TYPES[file.mimetype];
      callback(null,  Date.now() + "." + extension);
    },
  });
  
  module.exports = multer({ storage: storage }).single("image");