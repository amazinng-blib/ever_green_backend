const expressAsyncHandler = require('express-async-handler');
const SubscribeToNewsChannelModel = require('../../models/subscribe-to-newsletter-model');
const newsletterEmail = require('../../email-services/news-letter-email');

/**** SUBSCRIBE TO NEWS CHANNEL
/**** 
/**** 
 * 
*/
const subscribeToNewsLetter = expressAsyncHandler(async (req, res) => {
  try {
    const { email } = req?.body;
    const checkEmail = await SubscribeToNewsChannelModel.findOne({ email });

    if (checkEmail) {
      return res
        .status(400)
        .json({ message: 'You are already subscribed to our news letter' });
    }
    const saveEmail = await SubscribeToNewsChannelModel.create({ email });
    if (!saveEmail) {
      return res.status(422).json({ message: 'Unprocessible Entity' });
    }
    res
      .status(200)
      .json({ message: 'You have successfully Subscribed to our news letter' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST NEWS
/**** */
/**** */
/**** */

const postNews = expressAsyncHandler(async (req, res) => {
  try {
    // GET ALL SUBSCRIBED EMAIL
    const { title, body } = req?.body;
    const subscribers = await SubscribeToNewsChannelModel.find({});

    const users = subscribers?.map((x) => x?.email);

    //   todo: send emails to subscribers
    await newsletterEmail(users, body, title);

    res.status(200).json({ message: 'News Letter sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { subscribeToNewsLetter, postNews };
