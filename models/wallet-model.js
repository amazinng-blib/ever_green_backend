const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },

    bank_info: {
      bank_id: String,
      bank_name: String,
      account_type: String,
      account_name: String,
      account_number: String,
    },

    available_balance: Number,
    ledger_balance: Number,
  },

  { timestamps: true }
);

const WalletModel = mongoose.model('Wallet', walletSchema);
module.exports = WalletModel;
