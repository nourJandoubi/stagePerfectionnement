const Thing = require('../models/Fichier');
const fs = require('fs');

var dir = './tmp/but/then/nested';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

exports.createThing = async (req, res) => {
  const { nom, docurl, user } = req.body
  const { file } = req;
  thing = new Thing({
    docurl: (file && file.filename) || null,
    nom,
    user,


  });
  try {
    const savedPosts = await thing.save();
    res.status(200).json(savedPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};



exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.docurl.split('/documents/')[1];
      fs.unlink(`documents/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};