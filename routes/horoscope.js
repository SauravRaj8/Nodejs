const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication');
const horoscopeController = require('../controllers/horoscopeController');

router.use(authMiddleware);

router.get('/today', horoscopeController.getTodayHoroscope);

router.get('/history', horoscopeController.getHistory);

module.exports = router;