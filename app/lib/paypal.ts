const paypal = require("@paypal/checkout-server-sdk");

const configureEnvironment = () => {
  // For production, you might use environment variables for both values.
  const clientId = process.env.PAYPAL_CLIENT_ID;
  // const clientId =
  //   "Ac6tcgR0TAYCx_L-WzYOieGQptL8YaJJVthzSrUNhNV_J8d-ioR5u0ITgVg70K0PY36cHpv3950wdSVI";
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  console.log("paypal reere");
  console.log("PayPal Client ID:", clientId);
  console.log("PayPal Client Secret:", clientSecret);

  if (process.env.NODE_ENV === "production") {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const client = new paypal.core.PayPalHttpClient(configureEnvironment());

export default client;
