
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/Fichiers');

router.get('/', stuffCtrl.getAllStuff);
router.post('/', multer, stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);

router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;
multer.upload;