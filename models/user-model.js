const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  account: {
    type: String,
    enum: ['affiliate', 'personal'],
  },
  email: String,
  password: String,
  phone_number: String,
  telegram_Id: [String],
  ref: String,
  isVerified: {
    type: Boolean,
    default: false,
  },

  earnings: {
    type: Number,
    default: 0,
  },
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
});

const affiliateSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: String,
    account: {
      type: String,
      enum: ['affiliate', 'personal'],
      default: 'affiliate',
    },
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
        date_joined: { type: String },
        commission: Number,
      },
    ],
    earnings: {
      type: Number,
      default: 0,
    },
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
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', userSchema);
const AffiliateModel = mongoose.model('Affiliate', affiliateSchema);
module.exports = { UserModel, AffiliateModel };
