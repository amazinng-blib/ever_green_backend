const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

require('dotenv').config();

// todo: connect db
const db = require('./config/db');
db();

//todo: cors config

// const developmentOrigin = 'http://localhost:3000';
// const productionOrigin = 'https://ever-green-backend.onrender.com';

// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === 'production'
//         ? productionOrigin
//         : developmentOrigin,
//   })
// );

app.use(cors());
app.use(
  express.json({
    verify: (req, res, buf) => {
      const url = req.originalUrl;
      if (url.startsWith('/api/v1/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use(express.json());

//todo: Serve Swagger UI at /api-docs endpoint
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger/swagger-options');

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist'))
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// todo: routes

const authRoutes = require('./routes/user-routes');
const contactUsRoutes = require('./routes/contact-us-routes');
const subscribeToNewsLetterRoutes = require('./routes/subscribe-to-newsLetter-routes');
const licenseRoutes = require('./routes/license-routes');
const coinBaseRoutes = require('./routes/pay-with-coin');
const payStackRoutes = require('./routes/paystack-webhook');
const botLinkRoutes = require('./routes/bot-link-routes');
const transactionRoutes = require('./routes/transaction-routes');
const subscriptionsRoutes = require('./routes/subcription-routes');

app.use('/api/v1', authRoutes);
app.use('/api/v1', contactUsRoutes);
app.use('/api/v1', subscribeToNewsLetterRoutes);
app.use('/api/v1', licenseRoutes);
app.use('/api/v1', coinBaseRoutes);
app.use('/api/v1', payStackRoutes);
app.use('/api/v1', botLinkRoutes);
app.use('/api/v1', transactionRoutes);
app.use('/api/v1', subscriptionsRoutes);
// todo: starting express app

const PORT = process.env.PORT || 5060;
app.listen(PORT, () => {
  console.log(`SERVER listening at port: ${PORT}`);
});
