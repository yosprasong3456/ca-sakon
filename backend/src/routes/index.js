const express = require('express');
const router = express.Router();
const personController  = require('../controllers/personController')

router.get('/personHis', personController.getPersonHis);
router.post('/sendPerson', personController.sendPerson);


module.exports = router;