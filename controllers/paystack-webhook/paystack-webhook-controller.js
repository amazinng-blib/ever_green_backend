require('dotenv').config();

const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const UserModel = require('../../models/user-model');
const { generateToken } = require('../../utils/handletoken');
const registrationSuccessEmail = require('../../email-services/registration-success-email');
const formatDateToDDMMYY = require('../../utils/date-formatter');
const getCommission = require('../../utils/commission');

const payStackWebhook = expressAsyncHandler(async (req, res) => {
  try {
    const hash = crypto
      .createHmac(
        'sha512',
        process.env.PAYSTACK_SECRETE ||
          'sk_test_b8f838701c2bf5203ff6dd5e14999de634201ae8'
      )
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
      // Retrieve the request's body
      const event = req.body;

      if (event.event === 'charge.success') {
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
          first_name: first_name,
          last_name: last_name,
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
            const referral = await UserModel.findOne({
              ref_code: referal_code,
            });
            //   todo: create the user

            const currentDate = new Date(Date.now());

            const date_joined = formatDateToDDMMYY(currentDate);
            const commission = getCommission(plan_subscribed, amount_payed);

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
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = payStackWebhook;
