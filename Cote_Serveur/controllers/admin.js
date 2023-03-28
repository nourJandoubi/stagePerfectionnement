const Thing = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/////////insertion des donnes
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.motDePasse, 10)
    .then(hash => {
      const thing = new Thing({
        matricule: req.body.matricule,
        nom: req.body.nom,
        prenom: req.body.prenom,
        login: req.body.login,
        motDePasse: hash,
        code: req.body.code,
        isAdmin: req.body.isAdmin
      });
      thing.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ message: 'Utilisateur existe déja !' }));
    })
    .catch(error => res.status(500).json({ error }));
};


//////// getElmentbyid
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
///////
exports.getOneMail = (req, res, next) => {
  Thing.findOne({
    login: req.params.id
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

/////modifier un element
exports.modifyThing = (req, res, next) => {
  bcrypt.hash(req.body.motDePasse, 10)
    .then(hash => {
      const thing = new Thing({
        _id: req.params.id,
        matricule: req.body.matricule,
        nom: req.body.nom,
        prenom: req.body.prenom,
        login: req.body.login,
        code: req.body.code,
        motDePasse: hash,
        isAdmin: req.body.isAdmin
      });
      Thing.updateOne({ _id: req.params.id }, thing)
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
// exports.modifyThing  = (req, res, next) => {
//   bcrypt.hash(req.body.motDePasse, 10)
//   .then(hash => {
//     const thing= new Thing({
//       matricule: req.body.matricule,
//       nom: req.body.nom,
//       prenom: req.body.prenom,
//       login: req.body.login,
//       motDePasse: hash
//     });
//     Thing.updateOne({_id: req.params.id},{thing, _id: req.params.id} ).then(
//       () => {
//         res.status(200).json({
//           message: 'Thing updated successfully!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   })
//   .catch(error => res.status(500).json({ error }));
// };

/////supprimer un element
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }).then(
    (thing) => {
      if (!thing) {
        res.status(404).json({
          error: new Error('No such Thing!')
        });
      }
      if (thing.userId !== req.body.userId) {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      Thing.deleteOne({ _id: req.params.id }).then(
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
    }
  )
};


/////get all elementssss
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
//////loginnnnn
exports.login = (req, res, next) => {
  Thing.findOne({ login: req.body.login })
    .then(admin => {
      if (!admin) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.motDePasse, admin.motDePasse)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            adminId: admin._id,
            token: jwt.sign(
              { adminId: admin._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// exports.ComparePassWord = (req, res, next) => {
//   hash =  bcrypt.hash(req.body.motDePasse, 10);
//   console.log(hash);
//   return res.status(201).json({ error:hash });
//   }