const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { default: axios } = require('axios');
require('dotenv').config();

const { UserModel, AffiliateModel } = require('../../models/user-model');
const generateUniqueCode = require('../../utils/generateReferralCode');
const { generateToken } = require('../../utils/handletoken');
const formatDateToDDMMYY = require('../../utils/date-formatter');
const getCommission = require('../../utils/commission');
const registrationSuccessEmail = require('../../email-services/registration-success-email');
const forgotPasswordEmail = require('../../email-services/forgot-password-email');
const appData = require('../../variables/variables');
const cloudinaryUploaderOne = require('../../utils/cloudinary-uploader-1');
const PlanModel = require('../../models/plan-model');
const BillingModel = require('../../models/billing-history-model');
const WalletModel = require('../../models/wallet-model');

/**
 * Register user
 *
 *
 *
 */

const register = expressAsyncHandler(async (req, res) => {
  const email = req?.body?.email?.toLowerCase()?.trim();
  const first_name = req?.body?.first_name?.toLowerCase()?.trim();
  const last_name = req?.body?.last_name?.toLowerCase()?.trim();
  const telegram_Id = req?.body?.telegram_Id?.toLowerCase()?.trim();
  const referal_code = req?.query?.ref;
  const password = req.body.password;
  const account = req?.body?.account;

  const phone_number = req.body.phone_number;
  const amount_payed = req?.body?.amount_payed;
  const account_type = req?.body?.account_type;
  const payment_status = req?.body?.payment_status;
  const currency = req?.body?.currency;
  const plan_duration = req?.body?.plan_duration;
  const plan_category = req?.body?.plan_category;
  const reference_number = req?.body?.reference_number;

  let newUser;
  let affiliateUser;
  let plan;

  // todo: verify payment
  if (account === 'personal') {
    let data;
    try {
      data = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference_number}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY} || sk_test_b8f838701c2bf5203ff6dd5e14999de634201ae8`,
          },
        }
      );
      if (data && data?.data?.data.status !== 'success') {
        return res.status(400).json({ message: 'Payment not verified' });
      }

      const metadata = data?.data?.data?.metadata;
      const metaDataEmail = metadata?.email;
      if (metaDataEmail !== email) {
        return res.status(400).json({ message: 'Invalid User' });
      }

      if (data?.data?.data.currency === 'NGN') {
        const paystackAmount = Number(data?.data?.data?.amount / 100);

        if (Number(amount_payed) !== paystackAmount) {
          return res.status(400).json({ message: 'Invalid amount paid' });
        }
      }

      if (data?.data.data.currency === 'USD') {
        const paystackAmount = Number(data?.data?.data.amount);

        if (Number(amount_payed) !== paystackAmount) {
          return res.status(400).json({ message: 'Invalid amount paid' });
        }
      }
    } catch (error) {
      if (error) {
        return res.status(400).json({ message: 'Invalid Reference Number' });
      }
    }
  }

  try {
    // todo: validate user email

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Email must be a valid email' });
    }

    // todo: check if user exist

    const userExist = await UserModel.findOne({ email });
    const affiliateUserExist = await AffiliateModel.findOne({ email });

    if (userExist || affiliateUserExist) {
      return res
        .status(400)
        .json({ message: 'Account with this credentials already exist' });
    }

    // todo: gen ref code
    const userRefCode = generateUniqueCode();

    //   todo: encript password
    const salt = await bcrypt.genSalt();
    const passwordHarsh = await bcrypt.hash(password, salt);

    // todo: create user obj
    const userObj = {
      email,
      first_name,
      last_name,
      telegram_Id,
      phone_number,
      ref_code: account === 'affiliate' ? userRefCode : null,
      password: passwordHarsh,
      account,
    };

    // todo: update users wallet below

    // ---------------------------

    // todo: create the user
    newUser = new UserModel(userObj);
    await newUser.save();

    affiliateUser = new AffiliateModel(userObj);
    await affiliateUser.save(userObj);

    const token = generateToken(newUser?._id);

    if (newUser?._id) {
      const currentDate = new Date(Date.now());
      const commission = getCommission(plan_category, amount_payed);
      const date_joined = formatDateToDDMMYY(currentDate);

      // todo: check if the registration link contain ref code

      const isRefferedByUser = referal_code !== '';

      if (isRefferedByUser && account === 'personal') {
        // todo: get the user that referrer
        const referral = await AffiliateModel.findOne({
          ref_code: referal_code,
        });

        if (referral) {
          const refObj = {
            first_name,
            last_name,
            date_joined,
            commission,
          };
          referral.referrals.push(refObj);
          referral.earnings += commission;

          await referral.save();
        }
      }

      const walletObj = {
        user_id: newUser?._id,
      };

      const wallet = new WalletModel(walletObj);
      await wallet.save();

      if (wallet) {
        const userWallet = await WalletModel.findOne({ user_id: newUser?._id });
        // todo: update users wallet

        if (userWallet) {
          userWallet.withdrawable_balance += commission;
          userWallet.ledger_balance += commission;
          await userWallet.save();
        }

        const planObj = {
          subscriber: newUser?._id,
          amount_payed,
          plan_duration,
          plan_category,
          account_type,
          payment_status,
          currency,
        };

        plan = new PlanModel(planObj);
        await plan.save();
      }

      // todo: update billing history

      if (plan) {
        const getAllPlan = await PlanModel.find({ subscriber: newUser?._id });
        const billingHistoryObj = {
          current_plan: {
            subscriber: newUser?._id,
            amount_payed,
            plan_duration,
            plan_category,
            currency,
            account,
          },
          billing_history: getAllPlan,
        };

        const billingsData = new BillingModel(billingHistoryObj);
        await billingsData.save();
      }
    }

    // todo: send email
    await registrationSuccessEmail(newUser, token);

    return res.status(201).json({
      message: 'User Registered Successfully',
      userDetails: {
        newUser,
        affiliateUser,
        plan,
      },
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

/**
 * Forgot password
 *
 *
 *
 */

const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req?.body;
  try {
    const userExist = await UserModel.findOne({ email: email });

    if (!userExist) {
      return res.status(404).json({ message: 'Wrong Credentilas' });
    }
    const token = generateToken(userExist._id);
    const user = {
      email: userExist?.email,
      first_name: userExist?.first_name,
      token,
    };

    if (user) {
      const link = `${appData.frontendLink}/reset-password/${token}`;

      // todo: send email
      await forgotPasswordEmail(user, link);
    }

    // todo: send email

    res.status(200).json({
      message:
        "A password reset Link has been sent to the email and phone number you provided. Check your email inbox but if you can't find it, check your spam folder",
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

/**
 * Reset password
 *
 *
 *
 */

const resetPassword = expressAsyncHandler(async (req, res) => {
  const { password } = req?.body;
  const userId = req?.user?._id;

  try {
    const userExist = await UserModel.findById(userId);

    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }

    //todo: HASH PASSWORD
    const salt = await bcrypt.genSalt();
    const passwordHarsh = await bcrypt.hash(password, salt);

    userExist.password = passwordHarsh;

    await userExist.save();

    res
      .status(200)
      .json({ message: 'Your Passsword reset is Successfull', userExist });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

/**
 * Login User
 *
 *
 *
 */

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user?._id);
    if (user) {
      const { password, ...otherDetails } = user?._doc;

      const userDetails = {
        otherDetails,
        token,
      };

      return res
        .status(200)
        .json({ message: 'Logged-in Successfully', userDetails });
    }
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

/**
 * Get User By Id
 *
 *
 *
 */

const getUserById = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const account = req?.body?.account;
  let user;
  try {
    if (account === 'personal') {
      user = await UserModel.findById(userId);
    }

    if (account === 'affiliate') {
      user = await AffiliateModel.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    const { password, ...otherDetails } = user?._doc;
    const totalReferrals = user?.referrals?.length;
    const totalEarnings = user.earnings;

    const userDetails = {
      totalReferrals,
      otherDetails,
      totalEarnings,
    };

    return res.status(200).json({ userDetails });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

/**
 * Change profile picture
 *
 *
 *
 */

const changeProfile = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const account = req?.body?.account;
  let user;
  try {
    if (account === 'personal') {
      user = await UserModel.findById(userId);
    }

    if (account === 'affiliate') {
      user = await AffiliateModel.findById(userId);
    }
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let files = req?.files;

    if (files) {
      let multiplePicturePromise = files.map(async (picture, index) => {
        const b64 = Buffer.from(picture.buffer).toString('base64');
        let dataURI = 'data:' + picture.mimetype + ';base64,' + b64;
        const cldRes = await cloudinaryUploaderOne(dataURI, index);
        return cldRes;
      });

      // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
      // THAT CAN BE MAPPED
      const imageResponse = await Promise.all(multiplePicturePromise);
      const imageUrl = imageResponse.map((image) => {
        const url = image.secure_url;
        return { url };
      });
      user.profile_picture = imageUrl;
    }

    await user.save();

    const { password, ...userDetails } = user?._doc;

    return res.status(200).json({ message: 'Upload Success', userDetails });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

/**
 * Update User Details
 *
 *
 *
 */

const updateUserDetails = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const email = req?.body?.email?.toLowerCase()?.trim();
  const first_name = req?.body?.first_name?.toLowerCase()?.trim();
  const last_name = req?.body?.last_name?.toLowerCase()?.trim();
  const telegram_Id = req?.body?.telegram_Id?.toLowerCase()?.trim();
  const phone_number = req.body.phone_number;

  const account = req?.body?.account;
  let user;

  try {
    if (account === 'personal') {
      user = await UserModel.findById(userId);
    }

    if (account === 'affiliate') {
      user = await AffiliateModel.findById(userId);
    }
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    user.first_name = first_name;
    user.last_name = last_name;
    user.telegram_Id = telegram_Id;
    user.phone_number = phone_number;
    user.email = email;

    await user.save();

    const { password, ...userDetails } = user?._doc;

    return res
      .status(200)
      .json({ message: 'Updated Successfully', userDetails });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

/**
 * Update User Details
 *
 *
 *
 */

const fetchAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await UserModel.find({});
    const affiliateUsers = await AffiliateModel.find({});

    const totalUsers = await UserModel.find({}).countDocuments();
    const totalAffiliateUsers = await AffiliateModel.find({}).countDocuments();

    const user_docs = {
      users,
      affiliateUsers,
      totalUsers,
      totalAffiliateUsers,
    };

    return res.status(200).json(user_docs);
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

module.exports = {
  register,
  forgotPassword,
  resetPassword,
  loginUser,
  getUserById,
  changeProfile,
  updateUserDetails,
  fetchAllUsers,
};
