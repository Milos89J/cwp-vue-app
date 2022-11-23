const express = require('express');
const router = express.Router();

const CategoriCtrl = require('../controllers/categori');

router.get('', CategoriCtrl.getCategori);

module.exports = router;