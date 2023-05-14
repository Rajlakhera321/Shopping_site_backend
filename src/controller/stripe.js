const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

const addPayment = async (req, res) => {
    try {
        stripe.charges.create(
            {
              source: req.body.tokenId,
              amount: req.body.amount,
              currency: "usd",
            },
            (stripeErr, stripeRes) => {
              if (stripeErr) {
                res.status(500).json(stripeErr);
              } else {
                res.status(200).json(stripeRes);
              }
            }
          );
    } catch (error) {
        return res.status(500).json({message: "Internal server Error"})
    }
}

module.exports = {addPayment}