const nodemailer = require('nodemailer');
require('dotenv').config();

const licenseKeyRequestEmail = async (
  user,
  plan_type,
  plan_subscribed,
  date_subscribed,
  amount_paid
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smpt.gmail.com',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const options = {
      from: process.env.EMAIL,
      to: user?.email,
      subject: 'License Key Request',
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Firepips Online courses." />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
      integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <title>Evergreenfx</title>
  </head>
  <body style="margin: 0">
    <div
      style="
        background-color: #f6f6f6;
        max-width: 600px;
        margin: auto;
        padding: 50px 20px;
      "
    >
      <header
        style="
          background-color: rgb(175, 167, 167);
          padding-top: 1rem;
          padding-bottom: 1rem;
        "
      >
        <a
          href="https://evergreenfx.com"
          style="
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin: auto;
            width: 100%;
            text-decoration: none;
            padding: 1rem;
          "
        >
          <!-- <img
                    src="https://res.cloudinary.com/amazing1917/image/upload/v1682280454/egox1_hsktqz.png"
                    alt="Ernest-prdict"
                    width="50"
                    height="250"
                    style="object-fit: cover; width: 100%; height: 100%"
                  /> -->
          ${LOGO} <span style="font-size: 1.3rem"><b>EVERGREENFX</b></span>
        </a>
      </header>
      <br />

      <main
        style="
          text-align: center;
          min-height: 40vh;
          background-color: white;
          margin-top: 1.2rem;
          padding: 1rem 2rem;
        "
      >
        <h1 style="text-align: center; font-size: 1.2rem; font-weight: 600">
          LICENSE KEY REQUEST
        </h1>

        <br />

        <div style="text-align: center; font-size: 1rem; width: 100%">
          <p>
            <b> ${user?.first_name} ${user?.last_name} </b> is requesting for
            <b>License Key</b>
          </p>

          <div style="text-align: start">
            <h4 style="font-weight: 600">USER SUBSCRIPTION DETAILS</h4>
            <p><b>plan_type</b>: ${plan_type}</p>
            <p><b>Plan_Subscribed</b> :${plan_subscribed}</p>
            <p><b>Subscription_Date</b> : ${date_subscribed}</p>
            <p><b>Amount_paid</b> : ${amount_paid}</p>
          </div>
        </div>

        <br />
        <br />
        <br />
      </main>
    </div>
  </body>
</html>

      `,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = licenseKeyRequestEmail;
