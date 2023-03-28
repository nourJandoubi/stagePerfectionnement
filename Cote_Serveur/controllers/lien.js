const Thing = require('../models/Lien');
const fs = require('fs');

var dir = './tmp/but/then/nested';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

exports.createThing = async (req, res) => {
  const { nom, lien, user } = req.body
  const { file } = req;
  thing = new Thing({
    nom,
    lien,
    user,
    icone: (file && file.filename) || null
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

exports.modifyThing = (req, res, next) => {
  const { id } = req.params
  const { nom, lien, user } = req.body
  const { file } = req;
  // const thingObject = req.file ?
  //   {
  //     ...JSON.parse(req.body.thing),
  //     icone: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  //   } : { ...req.body };
  
  Thing.updateOne({ _id: id }, {
    nom,
    lien,
    icone: (file && file.filename) || null
  })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};
// exports.modifyThing = (req, res, next) => {
//   const thingObject = req.file ?
//     { // Copy req.body in order not to change it
//     icone= req.file.filename

//     } : { ...req.body };
//   Thing.updateOne({ _id: req.params.id }, { })
//     .then(() => res.status(200).json({ message: 'Objet modifié !' }))
//     .catch(error => res.status(400).json({ error }));
// };

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.icone.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
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
      const thing = things.map((el) => ({ ...el._doc, icone: `/images/${el._doc.icone}` }));
      res.status(200).send(thing);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};