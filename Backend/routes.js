const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('./models/Message');

router.get('/message', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

router.post('/message', async (req, res) => {
  console.log(req.body);
  const message = new Message(req.body);
  try {
    const savingData = await message.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
