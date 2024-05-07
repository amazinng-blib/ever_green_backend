const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount_to_withdraw: Number,
    transaction_type: {
      type: String,
      enum: ['Withdrawal'],
      default: 'Withdrawal',
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'declined', 'pending'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const TransactionModel = mongoose.model('transaction', transactionsSchema);
module.exports = TransactionModel;
