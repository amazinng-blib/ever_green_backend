const expressAsyncHandler = require('express-async-handler');
const { UserModel } = require('../../models/user-model');
const BotModel = require('../../models/bot-model');

const saveBotLink = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const bot_link = req?.body?.bot_link;
  try {
    const user = await UserModel.findById(userId);
    const isUser = user?.role === 'User';

    if (isUser) {
      return res.status(400).json({ message: 'Unauthorised User' });
    }

    const saveBot = new BotModel({ bot_link });

    await saveBot.save();
    res.status(201).json({ message: 'Action success', saveBot });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

const getBotLink = expressAsyncHandler(async (req, res) => {
  try {
    const botLink = await BotModel.find({});
    if (!botLink?.length) {
      return res.status(200).json({ message: 'No Both link yet', botLink });
    }

    res.status(200).json({ message: 'Action success', botLink });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

module.exports = { saveBotLink, getBotLink };
