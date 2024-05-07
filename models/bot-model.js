const mongoose = require('mongoose');

const bootSchema = new mongoose.Schema(
  {
    bot_link: String,
  },
  {
    timestamps: true,
  }
);

const BotModel = mongoose.model('bot', bootSchema);
module.exports = BotModel;
