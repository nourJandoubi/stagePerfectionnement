const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const stuffCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
var nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const { send } = require('express/lib/response');
const { compileETag } = require('express/lib/utils');
const { find } = require('../models/admin');
const cryptr = new Cryptr('myTotalySecretKey');
router.post('/signup', stuffCtrl.signup);
router.post('/login', stuffCtrl.login);
router.get('/', stuffCtrl.getAllStuff);
router.get('/:id', stuffCtrl.getOneThing);
router.get('/mail/:id', stuffCtrl.getOneMail);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);




function sendEmail(receiver, name, code) {
  var result = '';
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jandoubin873@gmail.com',
      pass: 'nourJANDOUBI12345.'
    }
  });

  var mailOptions = {
    from: 'jandoubin873@gmail.com',
    to: receiver,
    subject: ' Notification from Attijari leasing' + name,
    text: 'Bonjour Nous avons reçu une demande de réinitialisation de votre mot de passe.' +
      'Entrez le code de réinitialisation du mot de passe suivant : '
      + code,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return result;
}



function sendNotification(receiver) {
  var result = '';
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jandoubin873@gmail.com',
      pass: 'nourJANDOUBI12345.'
    }
  });

  var mailOptions = {
    from: 'jandoubin873@gmail.com',
    to: receiver,
    subject: ' Notification from Attijari leasing',
    text: 'Bonjour Nous avons reçu une demande de réinitialisation de votre mot de passe.' +
      'Entrez le code de réinitialisation du mot de passe suivant : '

  };

  transporter.sendMail(mailOptions, function (error, info) {

    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return result;
}
// creation d'un service pour reception de code

router.get('/getCode', async (req, res) => {
  console.log(res)
});

// password send email 
router.post('/request', async (req, res) => {
  try {
    // update code from the client request
    const code = makecode(6);
    sendEmail(req.body.login, req.body.name, code)
    let admin = await Admin.findOneAndUpdate({ _id: req.body._id }, { code: code }, {
      new: true
    });
  } catch (err) {
    return res.json({ status: "ok", message: err })

  }

});
// send email notification  
router.post('/notification', async (req, res) => {
  try {
    sendNotification(req.body.login)
  } catch (err) {
    return res.json({ status: "ok", message: err })

  }

});

function makecode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
router.post('/code', async (req, res) => {
  try {
    const user = await Admin.findOne({ login: req.body.login });
    console.log("user", user)
    // comparaison bin les deux codes 
    console.log("code user /code ", user.code);

    console.log("code body ", req.body)
    if (req.body.code === user.code) {

      return res.json({ status: "ok", message: 'you can reset' });
    } else {

      return res.json({ status: "err", message: 'wrong code' });
    }
  } catch (err) {
    return res.json({ message: err })
  }
});

module.exports = router; 
