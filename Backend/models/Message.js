const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  nameInput: {
    type: String
  },
  messageInput: {
    type: String
  }
});

module.exports = mongoose.model('Message', messageSchema);
