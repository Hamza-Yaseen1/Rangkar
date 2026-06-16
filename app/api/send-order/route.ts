import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import OrderNotification from "@/components/emails/OrderNotification";
import type { OrderData } from "@/components/emails/OrderNotification";

const resend = new Resend(process.env.RESEND_API_KEY);
const STORE_EMAIL = process.env.STORE_EMAIL || "orders@rangkar.com";

export async function POST(request: Request) {
  try {
    const order: OrderData = await request.json();

    if (!order.items || order.items.length === 0) {
      return NextResponse.json({ error: "Order must contain at least one item" }, { status: 400 });
    }

    const storeEmailHtml = await render(OrderNotification({ order }));

    const { data: storeEmailData, error: storeEmailError } = await resend.emails.send({
      from: "Rangkar Orders <onboarding@resend.dev>",
      to: STORE_EMAIL,
      subject: `New Order #${order.orderNumber} — ${order.customer.fullName}`,
      html: storeEmailHtml,
    });

    if (storeEmailError) {
      console.error("Failed to send store notification:", storeEmailError);
      return NextResponse.json({ error: "Failed to send order notification" }, { status: 500 });
    }

    let customerEmailData = null;
    if (order.customer.email) {
      const customerSubject = `Order Confirmation — #${order.orderNumber}`;
      const customerEmailHtml = await render(OrderNotification({ order }));
      
      const { data, error: customerError } = await resend.emails.send({
        from: "Rangkar <onboarding@resend.dev>",
        to: order.customer.email,
        subject: customerSubject,
        html: customerEmailHtml,
      });

      if (customerError) {
        console.error("Failed to send customer confirmation:", customerError);
      } else {
        customerEmailData = data;
      }
    }

    return NextResponse.json({
      success: true,
      storeEmailId: storeEmailData?.id,
      customerEmailId: customerEmailData?.id,
    });
  } catch (error) {
    console.error("Send-order API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
