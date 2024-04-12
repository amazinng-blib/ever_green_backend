require('dotenv').config();
var coinbase = require('coinbase-commerce-node');
const bcrypt = require('bcryptjs');

const expressAsyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const UserModel = require('../../models/user-model');
const { generateToken } = require('../../utils/handletoken');
const registrationSuccessEmail = require('../../email-services/registration-success-email');
const formatDateToDDMMYY = require('../../utils/date-formatter');
const getCommission = require('../../utils/commission');

var Client = coinbase.Client;
var resources = coinbase.resources;
const webhook = coinbase.Webhook;

Client.init(process.env.COIN_API_KEY || 'c29abb84-9895-4f3d-8880-80f39ab67d87');

const coinbaseCheckoutUrl = expressAsyncHandler(async (req, res) => {
  const email = req?.body?.email?.toLowerCase()?.trim();
  const first_name = req?.body?.first_name?.toLowerCase()?.trim();
  const last_name = req?.body?.last_name?.toLowerCase()?.trim();
  const telegram_Id = req?.body?.telegram_Id?.toLowerCase()?.trim();
  const referal_code = req?.body?.referal_code;
  const password = req.body.password;
  const phone_number = req.body.phone_number;
  const amount_payed = req?.body?.amount_payed;
  const plan_type = req?.body?.plan_type;
  const payment_status = req?.body?.payment_status;
  const currency = req?.body?.currency;
  const plan_duration = req?.body?.plan_duration;
  const account_type = req?.body?.account_type;
  const plan_category = req?.body?.plan_category;

  const title = `${account_type}` + ' ----- '`${plan_category}`;
  try {
    // TODO: Create coinbase checkout url

    const charge = await resources.Charge.create({
      name: title,
      description: `Subscription for ${title}`,
      local_price: {
        amount: amount,
        currency: 'USD',
      },
      pricing_type: 'fixed_price',
      metadata: {
        email,
        first_name,
        last_name,
        telegram_Id,
        referal_code,
        password,
        phone_number,
        amount_payed,
        plan_type,
        payment_status,
        currency,
        plan_duration,
      },
    });

    if (charge) {
      const hostedUrl = charge?.hosted_url;
      return res.status(200).json({ redirect: hostedUrl });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

const coinbaseWebhook = expressAsyncHandler(async (req, res) => {
  try {
    const event = webhook.verifyEventBody(
      req.rawBody,
      req.headers['x-cc-webhook-signature'],
      process.env.COINBASE_WEBHOOK_SECRET ||
        '769bb19a-ed69-44f0-bcfb-7a317568d60c'
    );

    if (event?.type === 'charge:confirmed') {
      const first_name = event?.data?.metadata?.first_name;
      const last_name = event?.data?.metadata?.last_name;
      const email = event?.data?.metadata?.email;
      const telegram_Id = event?.data?.metadata?.telegram_Id;
      const referal_code = event?.data?.metadata?.referal_code;
      const phone_number = event?.data?.metadata?.phone_number;
      const password = event?.data?.metadata?.password;
      const plan_type = event?.data?.metadata?.plan_type;
      const currency = event?.data?.metadata?.currency;
      const plan_duration = event?.data?.metadata?.plan_duration;
      const account_type = event?.data?.metadata?.account_type;
      //   todo: before creating new user, check if the user already exist
      // todo: if not, create the user , else, send email

      const userExist = await UserModel.find({
        first_name: { $regex: new RegExp('^' + first_name, 'i') },
        last_name: { $regex: new RegExp('^' + last_name, 'i') },
      });

      const token = generateToken(userExist?._id);
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
        ref_code: account_type === 'affiliate' ? userRefCode : null,
        password: passwordHarsh,
        account_type,

        plan: {
          amount_payed,
          plan_duration,
          plan_type,
          payment_status: 'SUCCESS',
          currency,
          plan_category,
        },
      };

      if (userExist) {
        // todo: send email
        return await registrationSuccessEmail(newUser, token);
      } else {
        // todo: check if the registration link contain ref code

        const isRefferedByUser = referal_code !== '';

        if (isRefferedByUser && account_type === 'personal') {
          // todo: get the user that referrer
          const referral = await UserModel.findOne({ ref_code: referal_code });
          //   todo: create the user

          const currentDate = new Date(Date.now());

          const date_joined = formatDateToDDMMYY(currentDate);
          const commission = getCommission(plan_duration, amount_payed);

          const refObj = {
            first_name,
            last_name,
            date_joined,
            commission,
          };
          referral.referrals.push(refObj);
          referral.earnings += commission;
        }

        // todo: create the user
        const newUser = new UserModel(userObj);
        await newUser.save();

        // todo: send email
        await registrationSuccessEmail(newUser, token);

        return res
          .status(201)
          .json({ message: 'User Registered Successfully', newUser });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = {
  coinbaseCheckoutUrl,
  coinbaseWebhook,
};
