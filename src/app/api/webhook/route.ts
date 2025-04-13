// app/api/webhooks/route.ts
import { stripe } from "@/lib/stripe";
import { Order } from "@/model/Order";
import mongoose from "mongoose";
import { headers } from "next/headers";
import type { Stripe } from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = headers();
//   const signature = headersList.get('stripe-signature');

//   if (!signature) {
//     return new Response("No signature found", { status: 400 });
//   }

  let event: Stripe.Event;

  try {
    // event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET! // Fixed typo from SECRET to SECRET
    // );
  } catch (err: unknown) {
    const error = err as Error;
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

//   const stripeSession = event.data.object as Stripe.Checkout.Session;

//   if (event.type === "checkout.session.completed") {
//     try {
//       const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
//         stripeSession.id,
//         {
//           expand: ["line_items"],
//         }
//       );
      
//       const orderId = stripeSession.metadata?.orderId;
      
//       if (!orderId) {
//         return new Response("Order ID not found", { status: 400 });
//       }

//       const dbSession = await mongoose.startSession();
//       await dbSession.startTransaction();

//       try {
//         await Order.findByIdAndUpdate(
//           orderId,
//           {
//             paymentStatus: "paid",
//             status: "completed",
//           },
//           { session: dbSession }
//         );

//         await dbSession.commitTransaction();
//         return new Response("Order updated successfully", { status: 200 });
//       } catch (error) {
//         await dbSession.abortTransaction();
//         console.error("Database error:", error);
//         return new Response("Database error", { status: 500 });
//       } finally {
//         await dbSession.endSession();
//       }
//     } catch (error) {
//       console.error("Stripe retrieval error:", error);
//       return new Response("Failed to retrieve session", { status: 500 });
//     }
//   }

  return new Response(null, { status: 200 });
}