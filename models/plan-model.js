const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    subscriber: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount_payed: Number,
    plan_duration: String,
    plan_category: {
      type: String,
      enum: ['Intro', 'Pro', 'Vip'],
      default: null,
    },
    account: {
      type: String,
      enum: ['affiliate', 'personal'],
    },
    account_type: {
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
  {
    timestamps: true,
  }
);

const PlanModel = mongoose.model('Plan', planSchema);
module.exports = PlanModel;
