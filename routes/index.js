const express = require('express');
const router = express.Router();
const Main = require('../controllers');
const Auth = require('../middleware');

router.post('/login', Main.login);
router.put('/countries', Auth.verify, Main.add);
router.get('/countries', Auth.verify, Main.getCountries);
router.delete('/countries', Auth.verify, Main.delete);

module.exports = router;