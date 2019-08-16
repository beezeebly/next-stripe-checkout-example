import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";

const Checkout = props => {
  const [stripe, setStripe] = useState(null);

  useEffect(
    () => setStripe(window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY)),
    []
  );

  const goToCheckout = () => {
    stripe
      .redirectToCheckout({
        sessionId: props.sessionId
      })
      .then(function(result) {
        console.log(result.error.message);
      });
  };

  return <button onClick={goToCheckout}>Pay</button>;
};

Checkout.getInitialProps = async function({ req }) {
  const res = await fetch(`http://localhost:3000/api/build-checkout`);
  const data = await res.json();

  return {
    sessionId: data.id
  };
};

export default Checkout;
