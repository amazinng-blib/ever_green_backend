const mongoose = require('mongoose');
const { Schema } = mongoose;

const licenseSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    license_key: String,
    trading_Id: String,
    date_purchased: Date,
    amount: Number,
    status: {
      type: String,
      enum: ['active', 'expired', 'pending'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const LicenseModel = mongoose.model('License', licenseSchema);

module.exports = LicenseModel;
