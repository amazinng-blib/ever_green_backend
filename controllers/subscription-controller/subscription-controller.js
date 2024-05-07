const { default: axios } = require('axios');
const expressAsyncHandler = require('express-async-handler');
const PlanModel = require('../../models/plan-model');
const BillingModel = require('../../models/billing-history-model');

const subscribeToPlan = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const {
    reference_number,
    amount_payed,
    plan_duration,
    plan_category,
    account_type,
    payment_status,
    currency,
  } = req?.body;
  let data;
  try {
    // todo: check users last sub

    const checkUserLastSub = await PlanModel.find({ subscriber: userId });

    const lastSub = checkUserLastSub[checkUserLastSub?.length - 1];
    const checkLastSubCompletedStatus =
      lastSub?.has_completed_subscription === false;

    if (checkLastSubCompletedStatus) {
      return res.status(400).json({
        message:
          "You can't purchase another plan now. You can only upgrade if you are still eligible",
      });
    }

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
      console.log({ paystackAmount });

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

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    const planObj = {
      subscriber: userId,
      amount_payed,
      plan_duration,
      plan_category,
      account_type,
      payment_status,
      currency,
    };

    const plan = new PlanModel(planObj);
    await plan.save();

    // todo: update billing history

    if (plan) {
      const getAllPlan = await PlanModel.find({ subscriber: userId });
      const billingHistoryObj = {
        current_plan: {
          subscriber: userId,
          amount_payed,
          plan_duration,
          plan_category,
          currency,
        },
        billing_history: getAllPlan,
      };

      const billingsData = new BillingModel(billingHistoryObj);
      await billingsData.save();
    }
    res.status(201).json({ message: 'Success', subscription: plan });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

const upgradePlan = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  let data;
  const {
    subId,
    reference_number,
    amount_payed,
    plan_duration,
    plan_category,
    account_type,
    payment_status,
    currency,
  } = req?.body;

  try {
    const user = await UserModel.findById(id);

    data = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference_number}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY} || sk_test_b8f838701c2bf5203ff6dd5e14999de634201ae8`,
        },
      }
    );

    // todo: check verification status

    if (data && data?.data?.data.status !== 'success') {
      return res.status(400).json({ message: 'Payment not verified' });
    }

    // todo: extract user email and compare it with the

    const metadata = data?.data?.data?.metadata;
    const metaDataEmail = metadata?.email;

    if (metaDataEmail !== user?.email) {
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
    return res.status(400).json({ message: 'Invalid Reference Number' });
  }

  try {
    const userSub = await PlanModel.findById(subId);

    if (!userSub) {
      return res.status(404).json({ message: 'No Sub found' });
    }

    userSub.amount_payed = amount_payed;
    userSub.plan_duration = plan_duration;
    userSub.plan_category = plan_category;
    userSub.account_type = account_type;
    userSub.payment_status = payment_status;
    userSub.currency = currency;

    await userSub.save();

    res.status(200).json({ message: 'Success', userSub });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

const subscriptionCompleted = expressAsyncHandler(async () => {
  const subscriptionId = req?.body?.subscriptionId;
  try {
    const userSub = await PlanModel.findById(subscriptionId);

    if (!userSub) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    userSub.has_completed_subscription = true;

    await userSub.save();
    res.status(200).json({ message: 'Action completed successfully', userSub });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

const allSubscriptions = expressAsyncHandler(async () => {
  try {
    const subscriptions = await PlanModel.find({});
    if (!subscriptions) {
      return res
        .status(200)
        .json({ message: 'No subscriptions at the moment' });
    }

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json(error?.message);
  }
});
module.exports = {
  subscribeToPlan,
  upgradePlan,
  subscriptionCompleted,
  allSubscriptions,
};
