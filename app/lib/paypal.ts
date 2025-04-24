const paypal = require("@paypal/checkout-server-sdk");

const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;

  if (clientId) {
    console.log("PayPal Client ID is available");
  }

  if (clientSecret) {
    console.log("PayPal Secret is available");
  }

  const mode = process.env.PAYPAL_MODE || "sandbox";
  console.log("PayPal Mode:", mode);

  if (process.env.NODE_ENV === "production") {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const client = new paypal.core.PayPalHttpClient(configureEnvironment());

export default client;
