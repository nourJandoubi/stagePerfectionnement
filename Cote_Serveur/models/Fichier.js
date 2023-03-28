const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const FichierSchema = mongoose.Schema({
  docurl: { type: String, required:false },
  nom: { type: String, required:false },
  user: { type: mongoose.Types.ObjectId, ref: "Admin",required:false },
  
 
});
// ActualiteSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Fichier', FichierSchema);