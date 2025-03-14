const paypal = require("@paypal/checkout-server-sdk");

const configureEnvironment = () => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not found in environment variables');
  }

  if(clientId){
    console.log("PayPal Client ID is available");
  }

  const mode = process.env.PAYPAL_MODE || 'sandbox';
  console.log("PayPal Mode:", mode);

  if (process.env.NODE_ENV === "production") {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const client = new paypal.core.PayPalHttpClient(configureEnvironment());

export default client;
