import { NextResponse } from "next/server";
const paypal = require("@paypal/checkout-server-sdk");
import paypalClient from "../../../lib/paypal";

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();

    // Create a capture request using the orderID.
    const captureRequest = new paypal.orders.OrdersCaptureRequest(orderID);

    // Call execute on the paypalClient object (do not call paypalClient() as a function).
    const captureResponse = await paypalClient.execute(captureRequest);

    return NextResponse.json(captureResponse.result);
  } catch (error: any) {
    console.error("PayPal Capture Order Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to capture order" },
      { status: 500 }
    );
  }
}
