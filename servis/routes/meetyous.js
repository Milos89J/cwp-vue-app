const express = require('express');
const router = express.Router();

const MeetyousCtrl = require('../controllers/meetyous');

router.get('', MeetyousCtrl.getMeetyous);
router.get('/:id', MeetyousCtrl.getMeetyouById);

module.exports = router;