const express = require('express');

const router = express.Router();

const aiController = require('../controllers/aiController');
const songControllers = require('../controllers/songControllers');

router.get('/', songControllers.getBands, (req, res) => {
  res.status(200).json(res.locals.bands);
});

router.post(
  '/query',
  aiController.promptReceiver,
  songControllers.getBands,
  (req, res) => {
    res.status(200).json(res.locals.bands);
  }
);

module.exports = router;
