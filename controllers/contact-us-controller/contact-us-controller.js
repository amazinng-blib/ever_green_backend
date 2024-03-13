const expressAsyncHandler = require('express-async-handler');

const contactUs = expressAsyncHandler(async (req, res) => {
  const { name, email, phone_number, subject, message } = req.body;
  try {
    // todo: send email when all fields coming from the body are defined

    if (name && email && phone_number && subject && message) {
      // todo: send email

      return res.status(200).json({
        message: `Thank You ${name} for contacting us. we will get back to you as soon as possible`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

module.exports = contactUs;
