const expressAsyncHandler = require('express-async-handler');
const { UserModel } = require('../../models/user-model');
const WalletModel = require('../../models/wallet-model');
const TransactionModel = require('../../models/transactions-model');

const requestForWithdrawal = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const { amount_to_withdraw } = req.body;
  try {
    const userWallet = await WalletModel.findOne({ user_id: userId });
    const withdrawable_balance = userWallet?.withdrawable_balance;

    const userWalletAddress = userWallet?.wallet_address;

    if (!userWalletAddress) {
      return res
        .status(400)
        .json({ message: 'Submit your wallet address to continue' });
    }

    const user = await UserModel.findById(userId);
    const userEarnings = user?.earnings;

    if (Number(amount_to_withdraw) > Number(userEarnings)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const transactionRequest = new Transaction({
      user: userId,
      amount_to_withdraw,
    });

    await transactionRequest.save();

    if (transactionRequest) {
      const remainingEarnings = Number(userEarnings) - amount_to_withdraw;

      user.earnings = remainingEarnings;
      await user.save();

      withdrawable_balance = remainingEarnings;
      await userWallet.save();
    }
    res.status(201).json({ message: 'Request Sent', transactionRequest });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

const submitWalletAddress = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const { wallet_address } = req?.body;
  try {
    const userWallet = await WalletModel.findOne({ user_id: userId });
    if (!userWallet) {
      return res.status(404).json({ message: 'Wallet Not found' });
    }

    userWallet.wallet_address = wallet_address;

    await userWallet.save();
    res.status(200).json({ message: 'Wallet Saved' });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

const respondToWithdrawalRequest = expressAsyncHandler(async (req, res) => {
  const adminId = req?.user?._id;
  const { userId, amount_to_withdraw, transactionId } = req.body;

  try {
    const admin = await UserModel.findById(adminId);
    const role = admin?.role === 'User';

    if (role) {
      return res.status(400).json({ message: 'UnAuthorised User' });
    }

    const user = await UserModel.findById(userId);
    const userEarnings = user?.earnings;
    const remainingEarnings = Number(userEarnings) - amount_to_withdraw;

    const userWallet = await WalletModel.findOne({ user_id: userId });
    const ledger_balance = userWallet?.ledger_balance;
    ledger_balance = remainingEarnings;

    await userWallet.save();

    const transaction = await TransactionModel.findById(transactionId);
    transaction.status = 'success';
    await transaction.save();
    res.status(200).json({ message: 'Action completed', Transaction });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

const getAllWithdrawalRequest = expressAsyncHandler(async (req, res) => {
  const adminId = req?.user?._id;

  try {
    const admin = await UserModel.findById(adminId);
    const role = admin?.role === 'User';

    if (role) {
      return res.status(400).json({ message: 'UnAuthorised User' });
    }

    const WithdrawalsRequest = await TransactionModel.find({});

    if (!WithdrawalsRequest?.length) {
      return res
        .status(200)
        .json({ message: 'No withdrawal at the moment', WithdrawalsRequest });
    }
    res.status(200).json(WithdrawalsRequest);
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

module.exports = {
  requestForWithdrawal,
  respondToWithdrawalRequest,
  getAllWithdrawalRequest,
  submitWalletAddress,
};
