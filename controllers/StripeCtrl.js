const stripe = require('stripe')('sk_test_5TC5lQ25W45SpAwUN9O6llq4009KocqXGo'); // Replace with your secret key

const createProductPaymentLink = async (req, res) => {
  try {
    // Create a product on Stripe (if necessary) or use an existing product ID
    const product = await stripe.products.create({
      name: 'Toy',
      description: 'Description of Example Product',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXe6ECa8tiQs_C9u9Y2IF-IXU320UHfYwo_w&s'], // Optional
    });

    const price = await stripe.prices.create({
      unit_amount: 5000, // Price in cents (e.g., $10.00)
      currency: 'usd',
      product: product.id,
    });

    // Create the payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
    });

    res.status(200).json({ url: paymentLink.url });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
}

module.exports = { createProductPaymentLink }