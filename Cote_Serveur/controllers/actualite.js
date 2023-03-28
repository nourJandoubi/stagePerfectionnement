const Thing = require('../models/Actualite');
const fs = require('fs');



exports.createThing = (req, res, next) => {
   // const thingObject = JSON.parse(req.body.commentaire,req.body.chemin);
    // delete thingObject._id;
    const thing = new Thing({
        _id: req.params.id,
        objet: req.body.objet,
        corps:req.body.corps,
        lien:req.body.lien,
        date:req.body.date,
        description:req.body.description,
        user:req.body.user
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).populate('user').then(
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
  const thing = new Thing({
    _id: req.params.id,
    objet: req.body.objet,
    corps:req.body.corps,
    lien:req.body.lien,
    date:req.body.date,
    description:req.body.description,
    user:req.body.user
  });
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
exports.getAllStuff = (req, res, next) => {
  Thing.find().populate('user').then(
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