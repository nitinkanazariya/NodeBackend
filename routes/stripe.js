const express = require('express');
const { createProductPaymentLink } = require('../controllers/StripeCtrl');
const stripeRoute = express.Router();

stripeRoute.post('/create-payment-link', createProductPaymentLink)


module.exports = stripeRoute;