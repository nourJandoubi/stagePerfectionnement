const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AdminSchema = mongoose.Schema({
  matricule: { type: Number, required:false},
  nom: { type: String, required: false },
  prenom: { type: String, required: false },
  login: { type: String, required: false ,unique:true },
  motDePasse: { type: String, required: false },
  code: { type: String, required: false },
  isAdmin: { type:Boolean, required: false }


});

AdminSchema.plugin(uniqueValidator);

var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;


