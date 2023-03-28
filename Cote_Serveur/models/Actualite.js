const mongoose = require('mongoose');
const ActualiteSchema = mongoose.Schema({
  objet: { type: String, required:false},
  corps: { type: String, required:false },
  lien: { type: String, required:false },
  date: { type:Date, required: false  },
  description: { type: String, required:false },
  user: { type: mongoose.Types.ObjectId, ref: "Admin",required:false }
});




module.exports = mongoose.model('Actualite', ActualiteSchema);