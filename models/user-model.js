const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: String,
  password: String,
  phone_number: String,
  telegram_Id: String,
  ref_code: String,
  referrals: [
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      date_joined: { type: Date },
      commission: Number,
    },
  ],
  profile_picture: [
    {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
  ],
  plan: {
    amount_payed: Number,
    plan_subscribed: {
      type: String,
      enum: ['Intro', 'Pro', 'Vip'],
      default: null,
    },
    payment_status: {
      type: String,
      enum: ['SUCCESS', 'PENDING', 'PROCESSING', 'FAILED', 'DECLINED'],
      default: null,
    },
    currency: {
      type: String,
      enum: ['NGN', 'USD'],
      default: null,
    },
    has_completed_subscription: {
      type: Boolean,
      default: false,
    },
  },
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
