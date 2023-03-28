const mongoose = require('mongoose');
const ActualiteSchema = mongoose.Schema({
  nom: { type: String, required:false},
  lien: { type: String, required:false },
  user: { type:String},
  icone: { type:Object, required:false }

});




module.exports = mongoose.model('Lien', ActualiteSchema);