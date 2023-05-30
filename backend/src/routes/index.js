const express = require('express');
const router = express.Router();
const personController  = require('../controllers/personController')
router.get('/personHis', personController.getPersonHis);

module.exports = router;