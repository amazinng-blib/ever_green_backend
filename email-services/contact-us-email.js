const nodemailer = require('nodemailer');
require('dotenv').config();

const contactUsEmail = async (name, email, phone_number, subject, message) => {
  const year = new Date().getFullYear();
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
      to: `${email}`,
      subject: `${subject}`,
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
    <img
        src="https://res.cloudinary.com/amazing1917/image/upload/v1712927536/evergreen_logo_hkvuva.png"
        alt="evergreenfx"
        width="50"
        height="250"
        style="object-fit: contain; width: 50%; height: 5rem"
      
      <span style="font-size: 1.3rem"><b>EVERGREENFX</b></span>
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
        <h1 style="text-align: center; font-size: 1.2rem; font-weight: 400">
          NEWS LETTER
        </h1>

        <br />

        <div style="text-align: center; font-size: 1.1rem; width: 100%">
          <p>${message}</p>
        </div>

        <br />
        <br />
        <br />
        <div>
        <h3 style="text-align: center; font-weight: 400">
       SENDER DETAILS:
       <h4>Sender Name : <span>${name}</span> </h4
       <h4>Sender Email : <span>${email}</span> </h4
       <h4>Sender Number : <span>${phone_number}</span> </h4
      </h3>
        
        </div>
      </main>

      <footer
        style="
          background-color: #6e6e6e;
          color: white;
          padding: 2rem;
          text-align: center;
        "
      >
        <div class="social-media">
          <p style="font-size: 1.3rem">Follow Us:</p>
          <a
            href="https://www.facebook.com/people/Nwankwo-Ernest-Onyebuchi/pfbid0aPXxuGtvX48C9VLRnpyG4eRGB9eg3vqBVuo66sTYGaosDkW2tCZTvvQavAZMZoRBl/"
            target="_blank"
            rel="noopener noreferrer"
            style="
              margin-right: 0.5rem;
              text-decoration: none;
              font-size: 1.3rem;
              color: #4267b2;
            "
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1920px-Facebook_f_logo_%282021%29.svg.png"
              alt="facebook"
              width="30"
              height="30"
              style="object-fit: cover"
            />
          </a>
          <a
            href="https://twitter.com/@NwankwoErnest02"
            target="_blank"
            rel="noopener noreferrer"
            style="
              margin-right: 0.5rem;
              text-decoration: none;
              font-size: 1.3rem;
              color: #1da1f2;
            "
          >
            <!-- src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1920px-Twitter-logo.svg.png" -->

            <img
              src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
              alt="twitter"
              width="30"
              height="30"
              style="object-fit: cover"
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style="
              margin-right: 0.5rem;
              text-decoration: none;
              font-size: 1.3rem;
              color: #833ab4;
            "
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1920px-Instagram_logo_2022.svg.png"
              alt="twitter"
              width="30"
              height="30"
              style="object-fit: cover"
            />
          </a>
        </div>
        <br />
        <hr style="border-width: 0.5px" />
        <p>
          &copy; <span class="year">${year}</span> evergreenfx. All rights
          reserved
        </p>
      </footer>
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

module.exports = contactUsEmail;
