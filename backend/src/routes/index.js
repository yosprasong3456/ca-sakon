const express = require('express');
const router = express.Router();
const personController  = require('../controllers/personController')

router.get('/personHis', personController.getPersonHis);
router.post('/sendPerson', personController.sendPerson);
// router.get('/sendPerson1', personController.sendPerson1);


module.exports = router;