// lib/paypal.ts
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_SECRET!; // Note: For the server, use the secret if needed
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  // For sandbox use SandboxEnvironment; for live, use LiveEnvironment.
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

export default client;
