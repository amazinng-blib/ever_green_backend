const mongoose = require('mongoose');

const SubscribeToNewsChannelSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

const SubscribeToNewsChannelModel = mongoose.model(
  'SubToNewsChannel',
  SubscribeToNewsChannelSchema
);

module.exports = SubscribeToNewsChannelModel;
