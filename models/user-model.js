const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  account_type: {
    type: String,
    enum: ['affiliate', 'personal'],
  },
  email: String,
  password: String,
  phone_number: String,
  telegram_Id: String,
  ref: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  referrals: [
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      date_joined: { type: Date },
      commission: Number,
    },
  ],
  earnings: Number,
  role: {
    type: String,
    enum: ['User', 'SuperAdmin'],
    default: 'User',
  },
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
    plan_duration: String,
    plan_category: {
      type: String,
      enum: ['Intro', 'Pro', 'Vip'],
      default: null,
    },
    plan_type: {
      type: String,
      enum: ['Single-Account', 'Double-Account'],
      default: null,
    },
    payment_status: {
      type: String,
      enum: ['SUCCESS', 'PENDING', 'PROCESSING', 'FAILED', 'DECLINED'],
      default: null,
    },
    currency: {
      type: String,
      enum: ['NGN', 'USD', 'FIAT'],
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
