const nodemailer = require('nodemailer');
const appData = require('../variables/variables');
require('dotenv').config();

const forgotPasswordEmail = async (user, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smpt.gmail.com',
      secure: false,
      auth: {
        user: process.env.Email,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const options = {
      from: process.env.EMAIL,
      to: `${user?.email}`,
      subject: 'Reset Passoword',
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="description"
            content="ernest-predict.com is the home of small odds with bigger bag."
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
            integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
          <title>EVERGREENFX</title>
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
              <h1 style="text-align: center; font-size: 1.5rem; font-weight: 400">
                <b>RESET PASSWORD</b>
              </h1>
      
              <br />
      
              <div style="text-align: center; font-size: 1.5rem">
                <p>
                  Good day dear valued ${user?.first_name}, You can Reset your
                  password by clicking on the button bellow
                </p>
      
                <div>
                <a href="${appData.frontendLink}/reset-password/${user.token}">

                  <button
                    style="
                      padding: 0.5rem 1.3rem;
                      border: none;
                      border-radius: 8px;
                      cursor: pointer;
                    "
                  >
                    reset password
                  </button>
                  </a>
                </div>
      
                <p style="margin: 1.5rem auto; text-align: center">OR</p>
      
                <p>
                  You can copy this link: ${link} and paste in your desired browser to
                  reset your password
                </p>
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

module.exports = forgotPasswordEmail;
