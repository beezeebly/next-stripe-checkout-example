const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: "T-shirt",
        description: "Comfortable cotton t-shirt",
        images: ["https://example.com/t-shirt.png"],
        amount: 500,
        currency: "usd",
        quantity: 1
      }
    ],
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel"
  });
  res.json(session);
};
