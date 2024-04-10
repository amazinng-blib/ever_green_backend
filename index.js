const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

require('dotenv').config();

// todo: connect db
const db = require('./config/db');
db();

//todo: cors config

const developmentOrigin = 'http://localhost:3000';
const productionOrigin = ['https://backend-interview-test.vercel.app'];

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? productionOrigin
        : developmentOrigin,
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

app.use('/api/v1', authRoutes);
app.use('/api/v1', contactUsRoutes);
app.use('/api/v1', subscribeToNewsLetterRoutes);
app.use('/api/v1', licenseRoutes);
// todo: starting express app

const PORT = process.env.PORT || 5060;
app.listen(PORT, () => {
  console.log(`SERVER listening at port: ${PORT}`);
});
